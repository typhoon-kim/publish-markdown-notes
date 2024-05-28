// Zero md 기본 설정
import { DEFAULT_HOST_CSS, ZeroMdBase } from "zero-md";

const jsdelivr = (url = '') => `https://cdn.jsdelivr.net/npm/${url}`

/**
 * @type {string[][]} First element is href, subsequent elements if any are attributes
 */
const DEFAULT_STYLESHEETS = [
    [jsdelivr('github-markdown-css@5.5.1/github-markdown-light.min.css')],
    [jsdelivr('@highlightjs/cdn-assets@11.9.0/styles/github.min.css')],
    [jsdelivr('katex@0/dist/katex.min.css')],
]

const DEFAULT_STYLESHEETS_DARK = [
    [jsdelivr('github-markdown-css@5.5.1/github-markdown-dark.min.css')],
    [jsdelivr('@highlightjs/cdn-assets@11.9.0/styles/github-dark.min.css')],
    [jsdelivr('katex@0/dist/katex.min.css')],
]

const DEFAULT_LIBRARIES = {
    marked: jsdelivr('marked@12.0.2/lib/marked.esm.js'),
    markedBaseUrl: jsdelivr('marked-base-url@1.1.3/+esm'),
    markedHighlight: jsdelivr('marked-highlight@2.1.1/+esm'),
    markedExtensions: [
        [jsdelivr('marked-gfm-heading-id@3.1.3/+esm'), 'gfmHeadingId'],
        [jsdelivr('marked-alert@2.0.1/+esm')]
    ],
    hljs: jsdelivr('@highlightjs/cdn-assets@11.9.0/es/highlight.min.js'),
    katex: jsdelivr('katex@0/dist/katex.mjs'),
    mermaid: jsdelivr('mermaid@10/dist/mermaid.esm.min.mjs')
}

let uid = 0 // 머메이드 렌더링을 위한 고유 아이디 생성 변수

/**
 * Extends ZeroMdBase with marked.js, syntax highlighting, math and mermaid features
 * zero-md.js 확장 및 옵시디언 md 규칙 추가 변환
 */
export default class CustomMarkdown extends ZeroMdBase {
    constructor() {
        super();
    }

    get theme() {
        return this.getAttribute('theme');
    }

    set theme(val) {
        if (val) {
            this.setAttribute('theme', val);
        } else {
            this.removeAttribute('theme');
        }
    }

    /**
     * overriding
     */
    static get observedAttributes() {
        return [...super.observedAttributes, 'theme'];
    }

    /**
     * overriding
     */
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (name === 'theme' && oldValue !== newValue) {
            this.load(); // 모드 변경 시 스타일시트를 다시 로드
            this.render();
        }
    }

    // 스타일시트 및 라이브러리 로드
    async load({ stylesheets = (this.theme === "dark" ? DEFAULT_STYLESHEETS_DARK : DEFAULT_STYLESHEETS), libraries = DEFAULT_LIBRARIES } = {}) {
        this.template = DEFAULT_HOST_CSS;

        // stylesheet
        this.template +=
            stylesheets
                .map(([href, ...attrs]) => `<link ${['rel="stylesheet"', ...attrs].join(' ')} href="${href}">`)
                .join('') + '<style>.markdown-alert{padding:0.25rem 0 0 1rem!important;}</style>';

        console.log(this.template);

        // marked libarary, extentions
        if (!this.marked) {
            const { marked, markedBaseUrl, markedHighlight, markedExtensions } = libraries;
            const mods = await Promise.all(
                [marked, markedBaseUrl, markedHighlight]
                    .concat(markedExtensions.map((i) => i[0]))
                    .map((i) => import(/* @vite-ignore */ i))
            );

            this.marked = new mods[0].Marked({ async: true });
            this.setBaseUrl = mods[1].baseUrl;
            this.markedHighlight = mods[2].markedHighlight;

            for (const [mod, key] of mods.slice(3).map((i, idx) => [i, markedExtensions[idx][1] || 'default'])) {
                this.marked.use(mod[key]());
            }
        }

        // katex
        const loadKatex = async () => {
            this.katex = (await import(/* @vite-ignore */ libraries.katex)).default;
        }

        /* eslint-disable */
        const inlineRule = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/;
        const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;

        // marked configuration + katex, mermaid, highlight
        /* eslint-enable */
        this.marked.use(
            {
                ...this.markedHighlight({
                    async: true,
                    highlight: async (code = '', lang = '') => {
                        if (lang === 'mermaid') {
                            if (!this.mermaid) {
                                this.mermaid = (await import(/* @vite-ignore */ libraries.mermaid)).default;
                                this.mermaid.initialize({ startOnLoad: false });
                            }
                            const { svg } = await this.mermaid.render(`mermaid-svg-${uid++}`, code);
                            return svg;
                        }

                        if (lang === 'math') {
                            if (!this.katex) await loadKatex();
                            return this.parseKatex(code, { displayMode: true });
                        }

                        if (!this.hljs) {
                            this.hljs = (await import(/* @vite-ignore */ libraries.hljs)).default;
                        }

                        return this.hljs.getLanguage(lang)
                            ? this.hljs.highlight(code, { language: lang }).value
                            : this.hljs.highlightAuto(code).value;
                    }
                }),
                renderer: {
                    code: (code = '', lang = '') => {
                        if (lang === 'mermaid') return `<div class="mermaid">${code}</div>`; //mermaid
                        if (lang === 'math') return code; //ketex
                        return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${code}\n</code></pre>`; //highlight
                    }
                }
            },
            {
                extensions: [
                    {
                        name: 'inlineKatex',
                        level: 'inline',
                        start(/** @type {*} */ src) {
                            let index
                            let indexSrc = src
                            while (indexSrc) {
                                index = indexSrc.indexOf('$')
                                if (index === -1) return
                                if (index === 0 || indexSrc.charAt(index - 1) === ' ') {
                                    const possibleKatex = indexSrc.substring(index)
                                    if (possibleKatex.match(inlineRule)) {
                                        return index
                                    }
                                }
                                indexSrc = indexSrc.substring(index + 1).replace(/^\$+/, '')
                            }
                        },
                        tokenizer(/** @type {*} */ src) {
                            const match = src.match(inlineRule)
                            if (match) {
                                return {
                                    type: 'inlineKatex',
                                    raw: match[0],
                                    text: match[2].trim(),
                                    displayMode: match[1].length === 2
                                }
                            }
                        },
                        renderer(/** @type {*} */ token) {
                            return token.text
                        }
                    },
                    {
                        name: 'blockKatex',
                        level: 'block',
                        tokenizer(/** @type {*} */ src) {
                            const match = src.match(blockRule)
                            if (match) {
                                return {
                                    type: 'blockKatex',
                                    raw: match[0],
                                    text: match[2].trim(),
                                    displayMode: match[1].length === 2
                                }
                            }
                        },
                        renderer(/** @type {*} */ token) {
                            return token.text
                        }
                    }
                ],
                walkTokens: async (/** @type {*} */ token) => {
                    if (['inlineKatex', 'blockKatex'].includes(token.type)) {
                        if (!this.katex) await loadKatex()
                        token.text = this.parseKatex(token.text, { displayMode: token.type === 'blockKatex' })
                    }
                }
            }
        )
    }

    parseKatex(text = '', opts = {}) {
        return this.katex.renderToString(text, { ...opts, throwOnError: false })
    }

    async parse({ text = '', baseUrl = '' }) {
        this.marked.use(this.setBaseUrl(baseUrl || ''))
        return this.marked.parse(text)
    }
}

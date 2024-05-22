<script>
    import { ContactRound, Link, Mail } from "lucide-svelte";

    const links = [
        {
            name: "GitHub",
            url: "https://github.com/typhoon-kim/",
            logo: "/images/icons/github.svg",
        },
        {
            name: "IT Blog",
            url: "https://typhoon-kim.tistory.com/",
            logo: "/images/icons/tstory.svg",
        },
        {
            name: "HR Blog",
            url: "https://brunch.co.kr/@ss-yeon/",
            logo: "/images/icons/brunch.svg",
        },
    ];
</script>

<section class="flex flex-col align-items-end contact {$$props.class}">
    <h1 class="sr-only">contect me</h1>
    <ul class="align-items-center m-0">
        <li class="flex px-1 py-1 align-items-end contact-item">
            <ContactRound class="icon" />
            <h1 class="fs-6 m-0 fw-bold">Contect here</h1>
        </li>
        <li class="flex px-1 py-0 contact-item">
            <Mail class="icon" />
            <span class="ms-1">
                <a href="mailto:typh007.kim@gmail.com">typh007.kim@gmail.com</a>
            </span>
        </li>
        <li class="flex px-1 py-0 contact-item">
            <Mail class="icon" />
            <span class="ms-1">
                <a href="mailto:typhoon_kim@kakao.com">typhoon_kim@kakao.com</a>
            </span>
        </li>
    </ul>
    <ul class="flex flex-col align-items-center m-0">
        <li class="flex px-1 py-1 align-items-end contact-item">
            <Link class="icon" />
            <h1 class="fs-6 m-0 fw-bold">Links</h1>
        </li>
        {#each links as link}
            <li class="flex px-1 py-1align-items-center contact-item">
                <span class="p-1 logo-wrapper d-inline-flex mx-1">
                    <img class="img-fluid" src={link.logo} alt={link.logo} />
                </span>
                <span class="ms-1">
                    <a href={link.url} target="_blank">{link.name}</a>
                </span>
            </li>
        {/each}
    </ul>
</section>

<style>
    .contact-item {

    }

</style>
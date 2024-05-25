import NotFound from "./routes/NotFound.svelte";
import Notebook from "./routes/Notebook.svelte";

const routes = {
    '/': Notebook,
    '/index': Notebook,
    '/book': Notebook,
    '/book/:left': Notebook,
    '/book/:left/:right': Notebook,
    '*': NotFound,
}

export default routes;
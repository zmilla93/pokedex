import { Route, RouterProvider, createBrowserRouter, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { PokemonView } from "./components/PokemonView";
import { PageWrapper } from "./pages/PageWrapper";
import { DebugView } from "./pages/Debug";
import { MovePage } from "./pages/MovePage";
import '../src/css/loaders.css';
import { HomePage } from "./pages/HomePage";
import { DataListsContextProvider } from "./contexts/DataListsContext";

// Hash browser needs to be used when hosting on github pages
// due to not having access to server side routing features.
const useHashRouter = true;

export default function App() {
    const routerContents = (
        <Route path="/" element={<PageWrapper />} >
            <Route index element={<HomePage />} />
            <Route path="pokemon" element={"Pokemon Landing Page! FIXME"} />
            <Route path="pokemon/:pokemonName" element={<PokemonView />} />

            <Route path="move" element={"Move Landing Page! FIXME"} />
            <Route path="move/:moveName" element={<MovePage />} />

            {/* FIXME : Disable debug page for production */}
            <Route path="debug" element={<DebugView />} />
            <Route path="*" element={"Not found."} />
        </Route>
    );
    const routerBuilder = useHashRouter ? createHashRouter : createBrowserRouter;
    const router = routerBuilder(createRoutesFromElements(routerContents));
    return (
        <DataListsContextProvider>
            <RouterProvider router={router} />
        </DataListsContextProvider>
    );
}
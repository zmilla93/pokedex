import { BrowserRouter, Link, Route, RouterProvider, Routes, createBrowserRouter, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { PokemonView } from "./components/Pokemon";
import { DebugSpriteViewer } from "./components/debug/DebugSpriteViewer";
import { PageWrapper } from "./pages/PageWrapper";
// const charData = require('../_project/data/charmeleon.json');
// const charDescData = require('../_project/data/charmeleon_description.json');

const useHashRouter = true;

export default function App() {
    const routerContents = (
        <Route path="/" element={<PageWrapper />} >
            {/* <Route index path="test" element={"Test!"} /> */}
            <Route path="pokemon" element={"Pokemon!"} />
            <Route path="pokemon/:pokemonName" element={<PokemonView />} />
            <Route path="*" element={"Not found."} />
        </Route>
    );
    const routerBuilder = useHashRouter ? createHashRouter : createBrowserRouter;
    const router = routerBuilder(createRoutesFromElements(routerContents));

    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}
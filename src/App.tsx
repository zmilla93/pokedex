import { PokemonView } from "./components/Pokemon";
import { DebugSpriteViewer } from "./components/debug/DebugSpriteViewer";
const charData = require('../_project/data/charmeleon.json');
const charDescData = require('../_project/data/charmeleon_description.json');

export default function App() {

    return (
        <>
            <h1 className="text-red-500">Pokedex App</h1>
            {/* <PokemonView pokemonName="charmeleon" data={charData} desc={charDescData} /> */}
            <DebugSpriteViewer pokeName="mewtwo" />
        </>
    )
}
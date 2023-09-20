import { PokemonView } from "./components/Pokemon";
import { DebugSpriteViewer } from "./components/debug/DebugSpriteViewer";
const charData = require('../_project/data/charmeleon.json');
const charDescData = require('../_project/data/charmeleon_description.json');

export default function App() {

    return (
        <>
            <h1 className="text-red-500">Pokedex App</h1>
            <div className="bg-red-400 flex justify-center">
                <PokemonView pokemonName="mew" />
            </div>

            {/* <DebugSpriteViewer pokeName="bulbasaur" /> */}
        </>
    )
}
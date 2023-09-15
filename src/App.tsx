import { PokemonView } from "./components/Pokemon";
import { PokeApi } from "./PokeAPI/PokeAPI";
import { Pokemon } from "./PokeAPI/types/Pokemon";
const charData = require('../_project/data/charmeleon.json');
const charDescData = require('../_project/data/charmeleon_description.json');

export default function App() {

    const api = new PokeApi();

    api.getPokemon("charizard").then(r => console.log(r)).catch(() => { });
    api.getPokemon("charizard");
    api.getPokemon("charizard");
    api.getPokemon("Solrock").then(r => console.log(r)).catch(() => { });
    api.getMove("pay-day").then(r => console.log(r)).catch(() => { });

    api.request<Pokemon>("pokemon/charizard").then(r => { console.log("char"); console.log(r.name) });

    api.printStats();

    return (
        <>
            <h1 className="text-red-500">App</h1>
            This is the app!
            <PokemonView pokemonName="charmeleon" data={charData} desc={charDescData} />
        </>
    )
}
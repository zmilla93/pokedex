import { useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { NamedAPIResourceList } from "../PokeAPI/types/Resource_Lists_Pagination";
import { dataToCleanString } from "../utility/StringCleaning";

// FIXME : This should be switched to a context, and also incorporate fuse list directly
export function usePokemonNames() {
    const [pokemonNames, setPokemonNames] = useState<null | string[]>(null);
    const [pokemonNamesClean, setPokemonNamesClean] = useState<null | string[]>(null);
    if (pokemonNames === null) {
        api.request<NamedAPIResourceList>("https://pokeapi.co/api/v2/pokemon/", -1)
            .then(data => {
                const names: string[] = [];
                const cleanNames: string[] = [];
                data.results.forEach(value => {
                    names.push(value.name);
                    cleanNames.push(dataToCleanString(value.name));
                });
                setPokemonNames(names);
                setPokemonNamesClean(cleanNames);
            });
    }
    return [pokemonNames, pokemonNamesClean];
}
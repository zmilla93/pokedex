import api from "../PokeAPI/PokeAPI";
import { Context, ReactNode, createContext, useContext, useState } from "react";
import { NamedAPIResourceList } from "../PokeAPI/types/Resource_Lists_Pagination";
import { dataToCleanString } from "../utility/StringCleaning";
import Fuse from "fuse.js";

interface ListContext {
    values: null | string[];
    setValues: (value: string[]) => void;
    cleanValues: null | string[];
    setCleanValues: (value: string[]) => void;
}

const DEFAULT_LIST_CONTEXT: ListContext = {
    values: null,
    setValues: () => { },
    cleanValues: null,
    setCleanValues: () => { }
};

const PokemonNamesContext = createContext(DEFAULT_LIST_CONTEXT);
const PokemonMovesContext = createContext(DEFAULT_LIST_CONTEXT);
const SearchListContext = createContext<PokemonAsset[]>([]);
const fuseOptions = {
    keys: ["name"],
    isCaseSensitive: false,
    threshold: 0.0,
    ignoreLocation: true,
};
export const SearchFuseContext = createContext<Fuse<PokemonAsset>>(new Fuse([], fuseOptions));

// FIXME : Might not need raw values, clean values might suffice
function useListContext(context: Context<ListContext>, endpoint: string) {
    const { values, setValues, cleanValues, setCleanValues } = useContext<ListContext>(context);
    if (values === null) {
        api.request<NamedAPIResourceList>(endpoint, -1)
            .then(data => {
                const values: string[] = [];
                const cleanValues: string[] = [];
                data.results.forEach(value => {
                    values.push(value.name);
                    cleanValues.push(dataToCleanString(value.name));
                });
                setValues(values);
                setCleanValues(cleanValues);
            });
    }
    return [values, cleanValues];
}

export function usePokemonNamesContext() {
    return useListContext(PokemonNamesContext, "https://pokeapi.co/api/v2/pokemon/");
}

export function usePokemonMovesContext() {
    return useListContext(PokemonMovesContext, "https://pokeapi.co/api/v2/move/");
}

export function DataListsContextProvider({ children }: { children?: ReactNode }) {
    const [pokemonNames, setPokemonNames] = useState<null | string[]>(null);
    const [cleanPokemonNames, setCleanPokemonNames] = useState<null | string[]>(null);
    const [pokemonMoves, setPokemonMoves] = useState<null | string[]>(null);
    const [cleanPokemonMoves, setCleanPokemonMoves] = useState<null | string[]>(null);
    const combinedLists: PokemonAsset[] = [];
    if (cleanPokemonNames !== null && cleanPokemonMoves !== null) {
        cleanPokemonNames.forEach(value => combinedLists.push(new PokemonAsset(value, "Pokemon")));
        cleanPokemonMoves.forEach(value => combinedLists.push(new PokemonAsset(value, "Move")));
    }
    const fuse = new Fuse(combinedLists, fuseOptions);
    return (
        <PokemonNamesContext.Provider value={{
            values: pokemonNames, setValues: setPokemonNames,
            cleanValues: cleanPokemonNames, setCleanValues: setCleanPokemonNames
        }}>
            <PokemonMovesContext.Provider value={{
                values: pokemonMoves, setValues: setPokemonMoves,
                cleanValues: cleanPokemonMoves, setCleanValues: setCleanPokemonMoves
            }}>
                <SearchListContext.Provider value={combinedLists}>
                    <SearchFuseContext.Provider value={fuse}>
                        {children}
                    </SearchFuseContext.Provider>
                </SearchListContext.Provider>
            </PokemonMovesContext.Provider>
        </PokemonNamesContext.Provider>
    );
}

export type PokemonAssetType = "Pokemon" | "Move";

export class PokemonAsset {
    constructor(public name: string, public type: PokemonAssetType) { }
}
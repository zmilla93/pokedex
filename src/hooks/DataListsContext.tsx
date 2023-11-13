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
const SearchListContext = createContext<string[]>([]);

// Fuse
const fuseOptions = {
    isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.0,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
};
export const SearchFuseContext = createContext<Fuse<string>>(new Fuse([], fuseOptions));
// const MAX_SEARCH_RESULTS = 10;

// FIXME : Might not need raw values, clean values might suffice
function useListContext(context: Context<ListContext>, endpoint: string) {
    const { values, setValues, cleanValues, setCleanValues } = useContext<ListContext>(context);
    if (values === null) {
        api.request<NamedAPIResourceList>(endpoint)
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
    let combinedLists: string[] = [];
    if (cleanPokemonNames !== null && cleanPokemonMoves !== null)
        combinedLists = [...cleanPokemonNames, ...cleanPokemonMoves];
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
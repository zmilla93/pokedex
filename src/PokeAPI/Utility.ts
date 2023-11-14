import { cleanStringToData } from '../utility/StringCleaning';

export function getMachineIdFromURL(url: string): number {
    let id = url.replace(/.*\/machine\//i, "");
    id = id.replace("/", "");
    return parseInt(id);
}

/**
 * Checks if the name is a valid pokemon
 * @param pokemonName The name of the pokemon
 * @returns True if valid pokemon, false otherwise
 */
export function isValidPokemon(pokemonNames: string[] | null, pokemonName: string): boolean {
    if (pokemonNames === null) return false;
    const dataName = cleanStringToData(pokemonName);
    return pokemonNames.includes(dataName);
}
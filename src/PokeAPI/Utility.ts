import { pokemonNames } from '../utility/data';

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
export function isValidPokemon(pokemonName: string): boolean {
    // FIXME : Use data to clean string
    const cleanName = pokemonName.toLowerCase().replace(" ", "-");
    return pokemonNames.includes(cleanName);
}
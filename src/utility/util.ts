import { pokemonNames } from "./data";

export function preloadImage(src: string) { new Image().src = src; }

export function getPreviousAndNextPokemon(pokemon: string) {
    const index = pokemonNames.indexOf(pokemon);
    let previous = null;
    let next = null;
    if (index > 0) previous = pokemonNames[index - 1];
    if (index < pokemonNames.length - 1) next = pokemonNames[index + 1];
    return [previous, next];
}

export function preloadImage(src: string) { new Image().src = src; }

export function getPreviousAndNextPokemon(pokemonNames: string[] | null, pokemon: string) {
    if (pokemonNames === null) return [null, null];
    const index = pokemonNames.indexOf(pokemon);
    let previous = null;
    let next = null;
    if (index > 0) previous = pokemonNames[index - 1];
    if (index < pokemonNames.length - 1) next = pokemonNames[index + 1];
    return [previous, next];
}
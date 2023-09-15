import { PokeApi } from "./PokeAPI";

const pokeList = require('../_project/data/poke.json');

export async function runStressTest() {
    const start = performance.now();
    const count = 100;
    const api = new PokeApi();
    const list = pokeList.results;
    for (let i = 0; i < count; i++) {
        const mon = list[i].name;
        console.log(i);
        const pokemon = await api.getPokemon(mon);
        console.log(pokemon.name);
    }
    for (let i = 0; i < count; i++) {
        const mon = list[i].name;
        console.log(i);
        const pokemon = await api.getPokemon(mon);
        console.log(pokemon.name.toUpperCase());
    }
    const end = performance.now();
    console.log(`Elapsed time: ${(end - start) / 1000} seconds`);

    api.printStats();

}
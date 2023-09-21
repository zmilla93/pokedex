import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { Pokemon, PokemonSpecies } from "../PokeAPI/types/Pokemon";

export function usePokemon(pokemonName: string) {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [species, setSpecies] = useState<PokemonSpecies>();
    useEffect(() => {
        api.getPokemon(pokemonName)
            .then(d => setPokemon(d))
            .catch(e => console.error(e));
    }, [pokemonName]);
    useEffect(() => {
        api.getPokemonSpecies(pokemonName)
            .then(d => setSpecies(d))
            .catch(e => console.error(e));
    }, [pokemonName]);
    const data: PokemonData = {
        pokemon: pokemon,
        species: species,
    }
    return data;
}

interface PokemonData {
    pokemon: Pokemon | undefined;
    species: PokemonSpecies | undefined;
}

export function validatePokemonData(data: PokemonData): boolean {
    if (data === undefined) return false;
    if (data.pokemon === undefined) return false;
    if (data.species === undefined) return false;
    return true;
}
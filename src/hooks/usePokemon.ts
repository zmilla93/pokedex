import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { Pokemon, PokemonSpecies } from "../PokeAPI/types/Pokemon";
import { isValidPokemon } from '../PokeAPI/Utility';

export function usePokemon(pokemonName: string) {
    const [pokemon, setPokemon] = useState<Pokemon | undefined>();
    const [speciesId, setSpeciesId] = useState<string | undefined>();
    const [species, setSpecies] = useState<PokemonSpecies>();
    const validPokemonName = isValidPokemon(pokemonName);
    useEffect(() => {
        if (!validPokemonName) {
            setPokemon(undefined);
            setSpeciesId(undefined);
            return;
        }
        api.getPokemon(pokemonName)
            .then(d => {
                setPokemon(d);
                setSpeciesId(d.species.name);
            })
            .catch(e => console.error(e));
    }, [pokemonName, validPokemonName]);
    useEffect(() => {
        if (speciesId === undefined) return;
        api.getPokemonSpecies(speciesId)
            .then(d => setSpecies(d))
            .catch(e => console.error(e));
    }, [speciesId]);
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
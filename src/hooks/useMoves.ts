import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { PokemonMove } from "../PokeAPI/types/Pokemon";
import { Move } from '../PokeAPI/types/Moves';

export function useMoves(pokemonName: string, filter: string | null = null) {
    const [moveData, setMoveData] = useState<Move[]>();
    useEffect(() => {
        async function fetchData() {
            // Get move list
            const pokemon = await api.getPokemon(pokemonName);
            const moveList = filterMoves(pokemon.moves, filter);
            // Get detailed move data
            const moves: Move[] = [];
            const requests = moveList.map(entry => api.getMove(entry.move.name).catch(e => { console.log(e); return null }));
            let responses = await Promise.all(requests);
            responses = responses.filter(response => response != null);
            // FIXME : Error handling
            responses.forEach(response => moves.push(response!));
            setMoveData(moves);
        }
        fetchData();
    }, [pokemonName, filter]);
    return moveData;
}

function filterMoves(moveList: PokemonMove[], filter: string | null) {
    if (filter === null) return moveList;
    const filteredMoves = moveList.filter(
        entry => {
            let valid = false;
            // FIXME : Switch to for loop for early return
            entry.version_group_details.forEach(version => {
                if (version.version_group.name === filter) {
                    valid = true;
                    return;
                }
                // valid = true;
            })
            return valid;
        })
    return filteredMoves;
}
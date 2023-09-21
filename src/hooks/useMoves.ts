import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { PokemonMove } from "../PokeAPI/types/Pokemon";
import { Move } from '../PokeAPI/types/Moves';
import { VersionGroupValue } from "../PokeAPI/types/Custom";

interface CombinedMove {
    move: Move;
    pokemonMove: PokemonMove;
}

export function useMoves(pokemonName: string, filter: VersionGroupValue | null = null) {
    const [pokemonMoveData, setPokemonMoveData] = useState<PokemonMove[]>();
    const [moveData, setMoveData] = useState<Move[]>();
    const [combinedMoveData, setCombinedMoveData] = useState<CombinedMove[]>();
    const [learnedMoves, setLearnedMoves] = useState<CombinedMove[]>();
    const [tmMoves, setTmMoves] = useState<CombinedMove[]>();
    const [hmMoves, setHmMoves] = useState<CombinedMove[]>();
    useEffect(() => {
        async function fetchData() {
            // Get move list
            const pokemon = await api.getPokemon(pokemonName);
            const moveList = filterMovesGameVersion(pokemon.moves, filter);
            // Get detailed move data
            const moves: Move[] = [];
            const requests = moveList.map(entry => api.getMove(entry.move.name).catch(e => { console.log(e); return null }));
            let responses = await Promise.all(requests);
            // FIXME : Error handling
            responses = responses.filter(response => response != null);
            responses.forEach(response => moves.push(response!));
            const combinedMoves: CombinedMove[] = []
            for (let i = 0; i < moveList.length; i++) {
                const combinedMove: CombinedMove = {
                    pokemonMove: moveList[i],
                    move: responses[i]!,
                }
                combinedMoves.push(combinedMove);
            }
            setMoveData(moves);
            setCombinedMoveData(combinedMoves);
        }
        fetchData();
    }, [pokemonName, filter]);
    return combinedMoveData;
}

function filterMovesGameVersion(moveList: PokemonMove[], filter: VersionGroupValue | null) {
    if (filter === null) return moveList;
    const filteredMoves = moveList.filter(
        entry => {
            entry.version_group_details = entry.version_group_details.filter(version => version.version_group.name === filter)
            return entry.version_group_details.length > 0;
        })
    return filteredMoves;
}

function filterMovesLearnMethod(moveList: PokemonMove[]) {
    const filteredMoves = moveList.filter(entry => {
        let valid = false;
        for (let i = 0; i < entry.version_group_details.length; i++) {
            let version = entry.version_group_details[i]
            if (version.move_learn_method.name === "level-up") {
                return true;
            }
            return false
        }
    })
}
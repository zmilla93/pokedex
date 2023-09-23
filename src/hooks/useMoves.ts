import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { PokemonMove } from "../PokeAPI/types/Pokemon";
import { Move } from '../PokeAPI/types/Moves';
import { MoveLearnMethodValue, VersionGroupValue } from "../PokeAPI/types/Custom";
import { Machine } from "../PokeAPI/types/Machines";
import { getMachineIdFromURL, isValidPokemon } from "../PokeAPI/Utility";

export interface CombinedMove {
    pokemonMove: PokemonMove;   // Maps a Pokemon to a Move (learn method, level, etc)
    move: Move;                 // Detailed info about the actual move
    machine: Machine | null;    // The machine that can train the move when applicable
}

export interface MoveList {
    learnedMoves: CombinedMove[];
    tmMoves: CombinedMove[];
    hmMoves: CombinedMove[];
    eggMoves: CombinedMove[];
}

export function useMoves(pokemonName: string, filter: VersionGroupValue) {
    const validName = isValidPokemon(pokemonName);
    const [moveList, setMoveList] = useState<MoveList>();
    useEffect(() => {
        if (!validName) {
            setMoveList(undefined);
            return;
        }
        (async () => {
            const moveList = await fetchData(pokemonName, filter);
            setMoveList(moveList);
            console.log(moveList.learnedMoves);
        })();
    }, [pokemonName, filter, validName]);
    return moveList;
}

async function fetchData(pokemonName: string, filter: VersionGroupValue): Promise<MoveList> {
    // Get PokemonMove list
    const pokemon = await api.getPokemon(pokemonName);
    const pokemonMoveList = filterMovesGameVersion(pokemon.moves, filter);
    // Get detailed move data
    // const moves: Move[] = [];
    const moveRequests = pokemonMoveList.map(entry => api.getMove(entry.move.name).catch(e => { console.log(e); return null }));
    let moveResponses = await Promise.all(moveRequests);
    // FIXME : Error handling
    moveResponses = moveResponses.filter(response => response != null);
    // moveResponses.forEach(response => moves.push(response!));
    const combinedMoves: CombinedMove[] = [];
    const nextLearnedMoves: CombinedMove[] = [];
    const nextTmMoves: CombinedMove[] = [];
    const nextHmMoves: CombinedMove[] = [];
    const nextEggMoves: CombinedMove[] = [];
    const machineRequests: Promise<Machine>[] = [];
    for (let i = 0; i < pokemonMoveList.length; i++) {
        const combinedMove: CombinedMove = {
            pokemonMove: pokemonMoveList[i],
            move: moveResponses[i]!,
            machine: null,
        }
        pokemonMoveList[i].version_group_details.forEach(version => {
            console.log(pokemonMoveList[i].move.name + " : " + version.level_learned_at);
            const learnMethod = version.move_learn_method.name as MoveLearnMethodValue;
            if (learnMethod === "level-up") nextLearnedMoves.push(combinedMove);
            // If a move can be learned via a machine, make an additonal api request to get data about the machine
            else if (learnMethod === "egg") nextEggMoves.push(combinedMove);
            else if (learnMethod === "machine") {
                combinedMove.move = filterMachines(combinedMove.move, filter);
                // FIXME : Remove check?
                if (combinedMove.move.machines.length != 1) throw new Error(`Move machine list is not 1: ${combinedMove.move.name}`);
                const machineId = getMachineIdFromURL(combinedMove.move.machines[0].machine.url);
                machineRequests.push(api.getMachine(machineId));
            }
        });
        combinedMoves.push(combinedMove);
    }
    // Map machines back to corresponding moves
    let machineResponses = await Promise.all(machineRequests);
    machineResponses = machineResponses.filter(response => response != null);
    let machineIndex = 0;
    for (let i = 0; i < pokemonMoveList.length; i++) {
        pokemonMoveList[i].version_group_details.forEach(version => {
            const learnMethod = version.move_learn_method.name as MoveLearnMethodValue;
            if (learnMethod === "machine") {
                const machine = machineResponses[machineIndex];
                const machineName = machine.item.name;
                combinedMoves[i].machine = machine;
                if (machineName.startsWith("tm")) nextTmMoves.push(combinedMoves[i]);
                else if (machineName.startsWith("hm")) nextHmMoves.push(combinedMoves[i])
                else console.error("Unknown machine type: " + machineName);
                machineIndex++;
            }
        })
    }
    return {
        learnedMoves: nextLearnedMoves,
        tmMoves: nextTmMoves,
        hmMoves: nextHmMoves,
        eggMoves: nextEggMoves,
    };
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

function filterMachines(move: Move, filter: VersionGroupValue | null) {
    if (filter === null) return move;
    move.machines = move.machines.filter(machine => machine.version_group.name === filter);
    return move;
}
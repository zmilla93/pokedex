import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { PokemonMove } from "../PokeAPI/types/Pokemon";
import { Move } from '../PokeAPI/types/Moves';
import { MoveLearnMethodValue, VersionGroupValue } from "../PokeAPI/types/Custom";
import { Machine } from "../PokeAPI/types/Machines";
import { getMachineIdFromURL } from "../PokeAPI/Utility";

export interface CombinedMove {
    move: Move;
    pokemonMove: PokemonMove;
    machine: Machine | null;
}

export interface MoveList {
    learnedMoves: CombinedMove[];
    tmMoves: CombinedMove[];
    hmMoves: CombinedMove[];
}

export function useMoves(pokemonName: string, filter: VersionGroupValue | null = null) {
    const [moveList, setMoveList] = useState<MoveList>();
    useEffect(() => {
        async function fetchData() {
            // Get PokemonMove list
            const pokemon = await api.getPokemon(pokemonName);
            const moveList = filterMovesGameVersion(pokemon.moves, filter);
            // Get detailed move data
            const moves: Move[] = [];
            const requests = moveList.map(entry => api.getMove(entry.move.name).catch(e => { console.log(e); return null }));
            let responses = await Promise.all(requests);
            // FIXME : Error handling
            responses = responses.filter(response => response != null);
            responses.forEach(response => moves.push(response!));
            const combinedMoves: CombinedMove[] = [];
            const nextLearnedMoves: CombinedMove[] = [];
            const nextTmMoves: CombinedMove[] = [];
            const nextHmMoves: CombinedMove[] = [];
            const machineRequests: Promise<Machine>[] = [];
            for (let i = 0; i < moveList.length; i++) {
                const combinedMove: CombinedMove = {
                    pokemonMove: moveList[i],
                    move: responses[i]!,
                    machine: null,
                }
                moveList[i].version_group_details.forEach(version => {
                    const learnMethod = version.move_learn_method.name as MoveLearnMethodValue;
                    if (learnMethod === "level-up") nextLearnedMoves.push(combinedMove);
                    // If a move can be learned via a machine, make an additonal api request to get data about the machine
                    else if (learnMethod === "machine") {
                        combinedMove.move = filterMoveMachines(combinedMove.move, filter);
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
            for (let i = 0; i < moveList.length; i++) {
                moveList[i].version_group_details.forEach(version => {
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
            setMoveList({
                learnedMoves: nextLearnedMoves,
                tmMoves: nextTmMoves,
                hmMoves: nextHmMoves,
            });
        }
        fetchData();
    }, [pokemonName, filter]);
    // return [combinedMoveData, learnedMoves];
    return moveList;
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

function filterMoveMachines(move: Move, filter: VersionGroupValue | null) {
    if (filter === null) return move;
    move.machines = move.machines.filter(machine => machine.version_group.name === filter);
    return move;
}
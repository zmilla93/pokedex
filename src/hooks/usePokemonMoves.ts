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

export interface MoveData {
    moveList: MoveList | undefined;
    hasMoveResponse: boolean;
    hasMachineResponse: boolean;
}

export function usePokemonMoves(pokemonName: string, filter: VersionGroupValue): MoveData {
    const validName = isValidPokemon(pokemonName);
    const [moveList, setMoveList] = useState<MoveList>();
    const [pokemonMoves, setPokemonMoves] = useState<PokemonMove[]>([]);
    const [moves, setMoves] = useState<Move[]>([]);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [hasMoveResponse, setHasMoveResponse] = useState(false);
    const [hasMachineResponse, setHasMachineResponse] = useState(false);
    // Fetch move data
    useEffect(() => {
        if (!validName) {
            setMoveList(undefined);
            setHasMoveResponse(false);
            setHasMachineResponse(false);
            return;
        }
        (async () => {
            const [nextPokemonMoves, nextMoves] = await fetchData(pokemonName);
            setPokemonMoves(nextPokemonMoves);
            setMoves(nextMoves);
            setHasMoveResponse(true);
        })();
    }, [pokemonName, validName]);

    // Fetch machine data
    useEffect(() => {
        (async () => {
            const nextMachines = await fetchMachineData(pokemonMoves, moves, filter);
            setMachines(nextMachines);
            setHasMachineResponse(hasMoveResponse);
        })();
    }, [pokemonMoves, moves, filter, hasMoveResponse]);

    // Filter move data into different categories based on target game
    useEffect(() => {
        const combinedMoves = filterData(pokemonMoves, moves, machines, filter);
        setMoveList(combinedMoves);
    }, [pokemonMoves, moves, machines, filter]);
    return {
        moveList: moveList,
        hasMoveResponse: hasMoveResponse,
        hasMachineResponse: hasMachineResponse,
    };
}

async function fetchData(pokemonName: string): Promise<[PokemonMove[], Move[]]> {
    // Get pokemon data, which contains a list of learnable moves
    const pokemon = await api.getPokemon(pokemonName);
    // Get detailed data for each move
    const moveRequests = pokemon.moves.map(entry => api.getMove(entry.move.name));
    const moveResponses = await Promise.all(moveRequests);
    return [pokemon.moves, moveResponses];
}

async function fetchMachineData(pokemonMoves: PokemonMove[], moves: Move[], gameVersion: VersionGroupValue): Promise<Machine[]> {
    const machineRequests: Promise<Machine>[] = [];
    const machineIds: number[] = [];
    for (let i = 0; i < pokemonMoves.length; i++) {
        const pokemonMove = pokemonMoves[i];
        const move = moves[i];
        if (!isMoveLearnableByMachine(pokemonMove)) continue;
        move.machines.forEach(machine => {
            if (machine.version_group.name !== gameVersion) return;
            const machineUrl = machine.machine.url as string;
            const machineId = getMachineIdFromURL(machineUrl);
            if (machineIds.includes(machineId)) return;
            machineIds.push(machineId);
            machineRequests.push(api.getMachine(machineId));
        });
    }
    // console.log(`Requested data for ${machineIds.length} machines.`);
    const machineResponses = await Promise.all(machineRequests);
    return machineResponses;
}

function filterData(pokemonMoves: PokemonMove[], moves: Move[], machines: Machine[], filter: VersionGroupValue): MoveList {
    const nextLearnedMoves: CombinedMove[] = [];
    const nextTmMoves: CombinedMove[] = [];
    const nextHmMoves: CombinedMove[] = [];
    const nextEggMoves: CombinedMove[] = [];
    for (let i = 0; i < moves.length; i++) {
        const combinedMove: CombinedMove = {
            pokemonMove: pokemonMoves[i],
            move: moves[i],
            machine: null,
        };
        pokemonMoves[i].version_group_details.forEach(version => {
            if (version.version_group.name !== filter) return;
            const learnMethod = version.move_learn_method.name as MoveLearnMethodValue;
            if (learnMethod === "level-up") {
                // Level up moves may have multiple entries for different levels, but should only be stored once.
                if (nextLearnedMoves.includes(combinedMove)) return;
                nextLearnedMoves.push(combinedMove);
            }
            else if (learnMethod === "egg") nextEggMoves.push(combinedMove);
            else if (learnMethod === "machine") {
                const machineVersion = moves[i].machines.find(machine => machine.version_group.name === filter);
                if (machineVersion === undefined || machineVersion === null) return;
                const machineId = getMachineIdFromURL(machineVersion.machine.url as string);
                const machine = machines.find(machine => machine.id === machineId);
                if (machine === undefined || machine === null) return;
                combinedMove.machine = machine;
                if (machine.item.name.startsWith("tm")) nextTmMoves.push(combinedMove);
                else if (machine.item.name.startsWith("hm")) nextHmMoves.push(combinedMove);
            }
        });
    }
    return {
        learnedMoves: nextLearnedMoves,
        tmMoves: nextTmMoves,
        hmMoves: nextHmMoves,
        eggMoves: nextEggMoves,
    };
}

function isMoveLearnableByMachine(pokemonMove: PokemonMove): boolean {
    for (let i = 0; i < pokemonMove.version_group_details.length; i++)
        if (pokemonMove.version_group_details[i].move_learn_method.name === "machine") return true;
    return false;
}
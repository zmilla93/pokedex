import { ReactElement } from "react";
import { CombinedMove, MoveList, useMoves } from '../../hooks/useMoves';
import { cleanString } from '../../PokeAPI/Utility';
import { TypeView } from "./TypeView";
import { PokemonMoveVersion } from '../../PokeAPI/types/Pokemon';

export type MoveTableType = "Level Up" | "TM" | "HM" | "Egg";

export function PokemonMoveTables({ pokemonName }: { pokemonName: string, moveTableType?: MoveTableType }) {
    const moveList = useMoves(pokemonName, "omega-ruby-alpha-sapphire");
    if (moveList === undefined) return;
    return (
        <>
            <PokemonMoveTable moveList={moveList} moveTableType="Level Up" />
            <PokemonMoveTable moveList={moveList} moveTableType="TM" />
            <PokemonMoveTable moveList={moveList} moveTableType="HM" />
            <PokemonMoveTable moveList={moveList} moveTableType="Egg" />
        </>
    );
}

function getMoveElement(entry: CombinedMove, moveTableType: MoveTableType, version: PokemonMoveVersion = entry.pokemonMove.version_group_details[0]) {
    const rowClass = "pr-6";
    const move = entry.move;
    const levelLearned = version.level_learned_at;
    const element = (
        <tr key={move.name + levelLearned}>
            <td className={rowClass}>{cleanString(move.name)}</td>
            <td className={rowClass}>{<TypeView types={[move.type.name]} />}</td>
            <td className={rowClass}>{move.power ? move.power : "-"}</td>
            <td className={rowClass}>{move.accuracy ? move.accuracy : "-"}</td>
            {moveTableType == "Level Up" && <td className={rowClass}>{levelLearned}</td>}
        </tr>
    );
    return new MoveElement(entry, version, element);
}

function PokemonMoveTable({ moveList, moveTableType }: { moveList: MoveList, moveTableType: MoveTableType }) {
    const targetMoveList = getTargetMoveTable(moveList, moveTableType);
    // FIXME : Show a message that no moves are present?
    // If the target move list has no entries, don't render anything
    // if (targetMoveList.length == 0) return;
    const moveListElements: MoveElement[] = [];
    targetMoveList.forEach(entry => {
        const move = entry.move;
        const pokemonMove = entry.pokemonMove;
        // const levelLearned = pokemonMove.version_group_details[0].level_learned_at;
        // FIXME : Remove debug checks?
        if (move.name != pokemonMove.move.name) throw new Error(`Move mismatch! ${move.name} : ${pokemonMove.move.name}`);
        if (pokemonMove.version_group_details.length < 1) console.error(`Version group details not length 1: ${move.name}`);
        if (moveTableType == "Level Up") {
            entry.pokemonMove.version_group_details.forEach(version => {
                if (version.move_learn_method.name !== "level-up") return;
                moveListElements.push(getMoveElement(entry, moveTableType, version));
            });
        } else moveListElements.push(getMoveElement(entry, moveTableType));
    });
    // moveListElements.sort(sortByLevel);
    moveListElements.sort(sortByName);

    return (
        <>
            <h1>{moveTableType} Moves</h1>
            <div className="m-2 border border-black rounded w-fit">
                <table className="">
                    <thead>
                        <tr>
                            <TableHeader>Name</TableHeader>
                            <td>Type</td>
                            <td>Power</td>
                            <td>Accuracy</td>
                            {moveTableType == "Level Up" && <td>Level</td>}
                        </tr>
                    </thead>
                    <tbody>
                        {moveListElements.map(entry => entry.element)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

// Elements
function TableHeader({ children }: { children: string }) {
    return (
        <td className="pr-20">
            {children}
        </td>
    );
}

function TableData({ children }: { children: string }) {
    return (
        <td className="pr-20">
            {children}
        </td>
    );
}


function getTargetMoveTable(moveList: MoveList, moveTableType: MoveTableType) {
    switch (moveTableType) {
        case "Level Up":
            return moveList.learnedMoves;
        case "TM":
            return moveList.tmMoves;
        case "HM":
            return moveList.hmMoves;
        case "Egg":
            return moveList.eggMoves;
    }
}

// Sorting Functions
// FIXME : Revisit secondary sorting options

function sortByName(moveA: MoveElement, moveB: MoveElement): number {
    const nameA = moveA.move.move.name;
    const nameB = moveB.move.move.name;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    if (moveA.version.level_learned_at === moveB.version.level_learned_at) return 0;
    return sortByLevel(moveA, moveB);
}

function sortByLevel(moveA: MoveElement, moveB: MoveElement): number {
    const levelA = moveA.version.level_learned_at;
    const levelB = moveB.version.level_learned_at;
    if (levelA < levelB) return -1;
    if (levelA > levelB) return 1;
    return sortByName(moveA, moveB);
}

class MoveElement {
    constructor(public move: CombinedMove, public version: PokemonMoveVersion, public element: ReactElement) { }
}
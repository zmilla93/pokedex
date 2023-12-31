import { ReactElement, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import { PokemonMoveVersion } from '../../PokeAPI/types/Pokemon';
import { useGameVersion } from "../../hooks/useGameVersion";
import { CombinedMove, MoveList, usePokemonMoves } from '../../hooks/usePokemonMoves';
import { Column, TwoColumnView } from "../TwoColumnView";
import { TypeView } from "./TypeView";
import { cleanMachine, dataToCleanString } from '../../utility/StringCleaning';

export type MoveTableType = "Level Up" | "TM" | "HM" | "Egg";

export function PokemonMoveTables({ pokemonName }: { pokemonName: string, moveTableType?: MoveTableType }) {
    const gameVersion = useGameVersion();
    const { moveList, hasMoveResponse, hasMachineResponse } = usePokemonMoves(pokemonName, gameVersion);
    if (moveList === undefined) return;
    const learnTable = <PokemonMoveTable key="Level Up" moveList={moveList} moveTableType="Level Up" />;
    const eggTable = <PokemonMoveTable key="Egg" moveList={moveList} moveTableType="Egg" />;
    const tmTable = <PokemonMoveTable key="TM" moveList={moveList} moveTableType="TM" />;
    const hmTable = <PokemonMoveTable key="HM" moveList={moveList} moveTableType="HM" />;
    // FIXME : Dialog for loading
    const leftCol = hasMoveResponse ? <>{learnTable}{eggTable}</> : "Loading Moves...";
    const rightCol = hasMachineResponse ? <>{tmTable}{hmTable}</> : "Loading Machines...";

    return (
        <TwoColumnView>
            <Column center>
                {leftCol}
            </Column>
            <Column center>
                {rightCol}
            </Column>
        </TwoColumnView>
    );
}

function getMoveElement(entry: CombinedMove, moveTableType: MoveTableType, searchParams: URLSearchParams, version: PokemonMoveVersion = entry.pokemonMove.version_group_details[0]) {
    const rowClass = "pr-6";
    const move = entry.move;
    const levelLearned = version.level_learned_at;
    const element = (
        <tr key={move.name + levelLearned}>
            {moveTableType === "Level Up" && <td className={rowClass}>{levelLearned}</td>}
            {(moveTableType === "TM" || moveTableType === "HM") && <td className={rowClass}>{cleanMachine(entry.machine!.item.name)}</td>}
            <td className={rowClass}><Link to={`/move/${move.name}?${searchParams.toString()}`}>{dataToCleanString(move.name)}</Link>{ }</td>
            <td className={rowClass}>{<TypeView types={[move.type.name]} />}</td>
            <td className={rowClass}>{move.power ? move.power : "-"}</td>
            <td className={rowClass}>{move.accuracy ? move.accuracy : "-"}</td>
        </tr>
    );
    return new MoveElement(entry, version, element);
}

function PokemonMoveTable({ moveList, moveTableType }: { moveList: MoveList, moveTableType: MoveTableType }) {
    const targetMoveList = getTargetMoveTable(moveList, moveTableType);
    const [searchParams] = useSearchParams();
    const [sortType, setSortType] = useState(getDefaultSortMethod(moveTableType));
    const [reverseSort, setReverseSort] = useState(false);
    const game = useGameVersion();
    // FIXME : Show a message that no moves are present?
    // If the target move list has no entries, don't render anything
    // if (targetMoveList.length == 0) return;
    const moveListElements: MoveElement[] = [];
    targetMoveList.forEach(entry => {
        const move = entry.move;
        const pokemonMove = entry.pokemonMove;
        // FIXME : Remove debug checks?
        if (move.name != pokemonMove.move.name) throw new Error(`Move mismatch! ${move.name} : ${pokemonMove.move.name}`);
        if (pokemonMove.version_group_details.length < 1) console.error(`Version group details not length 1: ${move.name}`);
        if (moveTableType == "Level Up") {
            entry.pokemonMove.version_group_details.forEach(version => {
                if (version.move_learn_method.name !== "level-up") return;
                if (version.version_group.name !== game) return;
                moveListElements.push(getMoveElement(entry, moveTableType, searchParams, version));
            });
        } else moveListElements.push(getMoveElement(entry, moveTableType, searchParams));
    });
    applySort(moveListElements, sortType);
    if (reverseSort) moveListElements.reverse();

    function adjustSort(e: React.MouseEvent<HTMLTableCellElement>) {
        const nextSortType = (e.target as HTMLHeadElement).innerHTML;
        setSortType(nextSortType);
        if (sortType === nextSortType) setReverseSort(!reverseSort);
        else setReverseSort(false);
    }

    return (
        <>
            <h1>{moveTableType} Moves</h1>
            <div className="m-2 border border-black rounded w-fit">
                <table className="">
                    <thead>
                        <tr>
                            {moveTableType == "Level Up" && <TableHeader onClick={adjustSort}>Level</TableHeader>}
                            {moveTableType == "TM" && <TableHeader onClick={adjustSort}>TM</TableHeader>}
                            {moveTableType == "HM" && <TableHeader onClick={adjustSort}>HM</TableHeader>}
                            <TableHeader onClick={adjustSort}>Name</TableHeader>
                            <TableHeader onClick={adjustSort}>Type</TableHeader>
                            <TableHeader onClick={adjustSort}>Power</TableHeader>
                            <TableHeader onClick={adjustSort}>Accuracy</TableHeader>
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

function TableHeader({ children, onClick }: { children: React.ReactNode, onClick: React.MouseEventHandler }) {
    return (
        <td
            className=" cursor-pointer"
            onClick={onClick}>
            {children}
        </td>
    );
}

function applySort(moveListElements: MoveElement[], sortType: string) {
    switch (sortType) {
        case "Name": return moveListElements.sort(sortByName);
        case "Type": return moveListElements.sort(sortByType);
        case "Power": return moveListElements.sort(sortByPower);
        case "Accuracy": return moveListElements.sort(sortByAccuracy);
        case "Level": return moveListElements.sort(sortByLevel);
        case "TM":
        case "HM":
            return moveListElements.sort(sortByMachine);
        default: throw new Error(`Sorting not implemented for ${sortType}!`);
    }
}

function getDefaultSortMethod(moveTableType: MoveTableType) {
    switch (moveTableType) {
        case "Level Up": return "Level";
        case "Egg": return "Name";
        case "TM": return "TM";
        case "HM": return "HM";
    }
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


// Pairs a Move with a ReactElement to allow for easy sorting
class MoveElement {
    constructor(public move: CombinedMove, public version: PokemonMoveVersion, public element: ReactElement) { }
}

// Sorting Functions
function sortByLevel(moveA: MoveElement, moveB: MoveElement): number {
    return sortByValue(moveA.version.level_learned_at, moveB.version.level_learned_at);
}

function sortByName(moveA: MoveElement, moveB: MoveElement): number {
    return sortByValue(moveA.move.move.name, moveB.move.move.name);
}

function sortByPower(moveA: MoveElement, moveB: MoveElement): number {
    return sortByValue(moveA.move.move.power, moveB.move.move.power);
}

function sortByAccuracy(moveA: MoveElement, moveB: MoveElement): number {
    return sortByValue(moveA.move.move.accuracy, moveB.move.move.accuracy);
}

function sortByType(moveA: MoveElement, moveB: MoveElement): number {
    return sortByValue(moveA.move.move.type.name, moveB.move.move.type.name);
}

function sortByMachine(moveA: MoveElement, moveB: MoveElement): number {
    return sortByValue(moveA.move.machine!.item.name, moveB.move.machine!.item.name);
}

function sortByValue(valueA: number | string, valueB: number | string) {
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
}
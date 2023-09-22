import { CombinedMove, MoveList, useMoves } from "../../hooks/useMoves";
import { cleanString, upperFirst } from '../../PokeAPI/Utility';

export type MoveTableType = "Level Up" | "TM" | "HM" | "Egg";

export function PokemonMoveTables({ pokemonName }: { pokemonName: string, moveTableType?: MoveTableType }) {
    const moveList = useMoves(pokemonName, "yellow");
    if (moveList === undefined) return;
    return (
        <>
            <PokemonMoveTable moveList={moveList} moveTableType="Level Up" />
            <PokemonMoveTable moveList={moveList} moveTableType="TM" />
            <PokemonMoveTable moveList={moveList} moveTableType="HM" />
            <PokemonMoveTable moveList={moveList} moveTableType="Egg" />
        </>
    )
}

function PokemonMoveTable({ moveList, moveTableType }: { moveList: MoveList, moveTableType: MoveTableType }) {
    const rowClass = "pr-20";
    const targetMoveList = getTargetMoveTable(moveList, moveTableType);
    // If the target move list has no entries, don't render anything
    // if (targetMoveList.length == 0) return;
    targetMoveList.sort(sortByLevel);
    const detailedMoveMap = targetMoveList.map(entry => {
        const move = entry.move;
        const pokemonMove = entry.pokemonMove;
        const levelLearned = pokemonMove.version_group_details[0].level_learned_at;
        // FIXME : Remove debug checks?
        if (move.name != pokemonMove.move.name) throw new Error(`Move mismatch! ${move.name} : ${pokemonMove.move.name}`)
        if (pokemonMove.version_group_details.length < 1) console.error(`Version group details not length 1: ${move.name}`)
        return (
            <tr key={move.name}>
                <td className={rowClass}>{cleanString(move.name)}</td>
                <td className={rowClass}>{upperFirst(move.type.name)}</td>
                <td className={rowClass}>{move.power ? move.power : "-"}</td>
                <td className={rowClass}>{move.accuracy ? move.accuracy : "-"}</td>
                <td className={rowClass}>{moveTableType == "Level Up" && levelLearned > 0 && levelLearned}</td>
            </tr>
        )
    })
    return (
        <>
            <h1>{moveTableType} Moves</h1>
            <div className="m-2 border border-black rounded w-fit">
                <table className="">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Damage Type</td>
                            <td>Power</td>
                            <td>Accuracy</td>
                        </tr>
                    </thead>
                    <tbody>
                        {detailedMoveMap}
                    </tbody>
                </table>
            </div>
        </>
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

function sortByLevel(moveA: CombinedMove, moveB: CombinedMove) {
    const levelA = moveA.pokemonMove.version_group_details[0].level_learned_at;
    const levelB = moveB.pokemonMove.version_group_details[0].level_learned_at;
    if (levelA < levelB) return -1
    if (levelA > levelB) return 1
    // FIXME : If levels are the same, sort by name instead
    return 0;
}
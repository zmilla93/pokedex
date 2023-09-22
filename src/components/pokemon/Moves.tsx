import { MoveList, useMoves } from "../../hooks/useMoves";

export type MoveTableType = "Level" | "TM" | "HM" | "Egg";

export function PokemonMovesTable({ pokemonName, moveTableType = "Level" }: { pokemonName: string, moveTableType?: MoveTableType }) {
    const moveList = useMoves(pokemonName, "ruby-sapphire");
    if (moveList === undefined) return;
    const rowClass = "pr-20"
    const targetMoves = getTargetMoveTable(moveList, moveTableType);

    const detailedMoveMap = targetMoves.map(entry => {
        const move = entry.move;
        const pokemonMove = entry.pokemonMove;
        const levelLearned = pokemonMove.version_group_details[0].level_learned_at;
        // FIXME : Remove debug checks?
        if (move.name != pokemonMove.move.name) throw new Error(`Move mismatch! ${move.name} : ${pokemonMove.move.name}`)
        if (pokemonMove.version_group_details.length < 1) console.error(`Version group details not length 1: ${move.name}`)
        return (<tr key={move.name}>
            <td className={rowClass}>{move.name}</td>
            <td className={rowClass}>{move.type.name}</td>
            {/* <td className={rowClass}>{move.damage_class.name}</td> */}
            {/* <td className={rowClass}>{pokemonMove.version_group_details[0].move_learn_method.name}</td> */}
            <td className={rowClass}>{move.power ? move.power : "-"}</td>
            <td className={rowClass}>{move.accuracy ? move.accuracy : "-"}</td>
            <td className={rowClass}>{moveTableType == "Level" && levelLearned > 0 && levelLearned}</td>
        </tr>
        )
    })

    return (<table>
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
    </table>)
}

function getTargetMoveTable(moveList: MoveList, moveTableType: MoveTableType) {
    switch (moveTableType) {
        case "Level":
            return moveList.learnedMoves;
        case "TM":
            return moveList.tmMoves;
        case "HM":
            return moveList.hmMoves;
        case "Egg":
            return moveList.eggMoves;
    }
}
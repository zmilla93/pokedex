import { useMoves } from "../../hooks/useMoves";

export function PokemonMovesTable({ pokemonName }: { pokemonName: string }) {
    const moveList = useMoves(pokemonName, "red-blue");
    // const moveData = combinedMoveData
    if (moveList === undefined) return;
    // if (learnedMoveData === undefined) return;
    const rowClass = "pr-20"
    // console.log(combinedMoveData);
    const detailedMoveMap = moveList.learnedMoves.map(entry => {
        const move = entry.move;
        const pokemonMove = entry.pokemonMove;
        const levelLearned = pokemonMove.version_group_details[0].level_learned_at;
        // FIXME : Remove this check
        if (entry.move.name != entry.pokemonMove.move.name) {
            throw new Error(`Move mismatch! ${entry.move.name} : ${entry.pokemonMove.move.name}`)
        }
        if (pokemonMove.version_group_details.length < 1) console.error(`Version group details not length 1: ${move.name}`)

        return (<tr key={move.name}>
            <td className={rowClass}>{move.name}</td>
            <td className={rowClass}>{move.type.name}</td>
            {/* <td className={rowClass}>{move.damage_class.name}</td> */}
            <td className={rowClass}>{pokemonMove.version_group_details[0].move_learn_method.name}</td>
            <td className={rowClass}>{levelLearned > 0 && levelLearned}</td>
        </tr>
        )
    })

    return (<table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Damage Type</td>
            </tr>
        </thead>
        <tbody>
            {detailedMoveMap}
        </tbody>
    </table>)
}
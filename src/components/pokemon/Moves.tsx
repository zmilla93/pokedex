import { useMoves } from "../../hooks/useMoves";

export function PokemonMovesTable({ pokemonName }: { pokemonName: string }) {
    const moveData = useMoves(pokemonName, "red-blue");
    if (moveData === undefined) return;
    const detailedMoveMap = moveData.map(entry => {
        return (<tr key={entry.name}>
            <td>{entry.name}</td>
            <td>{entry.damage_class.name}</td>
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
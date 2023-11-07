import { useLocation, useNavigate, useParams } from 'react-router-dom';
import assert from '../utility/assert';
import { useMove } from '../hooks/useMove';
import { Move } from '../PokeAPI/types/Moves';
import { TypeView } from '../components/pokemon/TypeView';
import { ReactNode, useEffect } from 'react';
import { Column, TwoColumnView } from '../components/TwoColumnView';
import { VersionGroupValue } from '../PokeAPI/types/Custom';
import { useGameVersion } from '../hooks/useGameVersion';
import { ContentWrapper } from '../components/ContentWrapper';
import { setTitle } from '../utility/util';

export function MovePage() {
    const params = useParams();
    const moveName = params.moveName;
    const location = useLocation();
    const navigate = useNavigate();
    const gameVersion = useGameVersion();

    assert(() => moveName !== undefined, "Move is undefined!");
    const moveDataUnchecked = useMove(moveName!);
    useEffect(() => {
        if (moveName) setTitle(moveName);
    });
    if (moveName === undefined || moveDataUnchecked === undefined) {
        // FIXME
        return (
            <div>
                Move not found!
            </div>
        );
    }
    if (moveDataUnchecked === null) return (<div>NULL MOVE</div>);
    const moveData = moveDataUnchecked as Move;


    function handlePokemonClick(pokemonName: string) {
        navigate(`/pokemon/${pokemonName}${location.search}`);
    }

    const learnedBy = moveData.learned_by_pokemon.map(entry => {
        return (
            <div key={entry.name}
                className="border rounded px-2 py-1 m-1 cursor-pointer"
                onClick={() => handlePokemonClick(entry.name)}>
                {entry.name}
            </div>
        );
    });
    return (
        <ContentWrapper>
            <TwoColumnView>
                <Column>
                    <table>
                        <thead></thead>
                        <tbody>
                            <MoveTableRow title="Name" data={moveData.name} />
                            <MoveTableRow title="Type" data={<TypeView types={[moveData.type.name]} />} />
                            <MoveTableRow title="Damage Class" data={moveData.damage_class.name} />
                            <MoveTableRow title="Target" data={moveData.target.name} />
                            <MoveTableRow title="Accuracy" data={moveData.accuracy} />
                            <MoveTableRow title="Power" data={moveData.power} />
                            <MoveTableRow title="PP" data={moveData.pp} />
                            <MoveTableRow title="Introduced" data={moveData.generation.name} />
                        </tbody>
                    </table>
                </Column>
                <Column>
                    Description:
                    <div>
                        {getMoveDescription(moveData, gameVersion)}
                    </div>
                </Column>
            </TwoColumnView>

            <div>

            </div>

            <div>Learned By:</div>
            <div className="flex flex-wrap">
                {learnedBy}
            </div>
        </ContentWrapper>
    );
}

function getMoveDescription(moveData: Move, game: VersionGroupValue) {
    let descriptionEntry = moveData.flavor_text_entries.find(entry => entry.version_group.name === game && entry.language.name === "en");
    if (descriptionEntry === undefined) descriptionEntry = moveData.flavor_text_entries.find(entry => entry.language.name === "en");
    if (descriptionEntry === undefined) descriptionEntry = moveData.flavor_text_entries[0];
    return descriptionEntry.flavor_text;
}

function MoveTableRow({ title, data }: { title: string, data: ReactNode }) {
    return (
        <tr>
            <td className="pr-10">{title}</td>
            <td>{data}</td>
        </tr>
    );
}
import { pokemonTypes } from '../../utility/data';
import { TypeView } from '../pokemon/TypeView';

export function DebugTypeViewer() {

    const typeViews = pokemonTypes.map(t => {
        return <TypeView key={t} types={[t]} />
    });

    return (
        <div>
            {typeViews}
        </div>
    );
}
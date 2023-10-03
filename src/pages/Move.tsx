import { useParams } from 'react-router-dom';
import assert from '../utility/assert';

export function MovePage() {
    const params = useParams();
    const moveName = params.moveName;
    assert(() => moveName !== undefined, "Move is undefined!");
    if (moveName === undefined) {
        // FIXME
        return (
            <div>
                Move not found!
            </div>
        );
    }
    return (
        <div>
            Move Page: {moveName}
        </div>
    );
}
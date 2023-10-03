import { ChangeEvent } from "react";
import { gameVersions } from "../utility/data";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function GameSelector() {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let currentGame: string | null | undefined = searchParams.get("game");
    if (currentGame === null) currentGame = undefined;

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        navigate(location.pathname + "?game=" + e.target.value);
    }

    const options = gameVersions.map(v => {
        return (<option key={v}>{v}</option>);
    });

    return (
        <div>
            <select
                className="border border-black rounded outline-none"
                name="gameVersion"
                onChange={handleChange}
                value={currentGame}
            >
                <option className="hidden"></option>
                {options}
            </select>
        </div>
    );
}
import { ChangeEvent } from "react";
import { gameVersions, gameVersionsClean } from "../utility/data";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_GAME } from "../utility/defaults";

export function GameSelector() {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let currentGame: string | null | undefined = searchParams.get("game");
    if (currentGame === null) currentGame = DEFAULT_GAME;
    const currentGameClean = gameVersionsClean[gameVersions.indexOf(currentGame)];
    const options = gameVersionsClean.map(v => {
        return (<option key={v}>{v}</option>);
    });

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = gameVersions[e.target.selectedIndex];
        searchParams.set("game", value);
        navigate(location.pathname + "?" + searchParams.toString(), { replace: true });
    }

    return (
        <div>
            <select
                className="border border-black rounded outline-none"
                name="gameVersion"
                onChange={handleChange}
                value={currentGameClean}
            >
                {options}
            </select>
        </div>
    );
}
import { useSearchParams } from "react-router-dom";
import { DEFAULT_GAME } from '../utility/defaults';
import { VersionGroupValue } from "../PokeAPI/types/Custom";

export function useGameVersion(): VersionGroupValue {
    const [searchParams] = useSearchParams();
    const gameVersion = searchParams.get("game") as VersionGroupValue || DEFAULT_GAME;
    return gameVersion;
}
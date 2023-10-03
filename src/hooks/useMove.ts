import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { Move } from "../PokeAPI/types/Moves";

export function useMove(moveName: string) {
    const [moveData, setMoveData] = useState<null | Move>(null);
    useEffect(() => {
        api.getMove(moveName).then(result => {
            if (result === null) return;
            setMoveData(result);
        }).catch(e => console.error(e));
    }, [moveName]);
    return moveData;
}
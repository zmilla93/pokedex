import { Link, useLocation } from "react-router-dom";
import { GameSelector } from "./GameSelector";
import { SearchBar } from "./SearchBox";
import { usePokemonMovesContext, usePokemonNamesContext } from "../hooks/DataListsContext";

export function Navbar() {
    const location = useLocation();
    return (
        <div className="flex justify-between w-full p-2 border-b-2 border-b-blue-400 bg-gray-100">
            <Link to={`/${location.search}`}><h1 className="text-blue-400">Pokedex App</h1></Link>
            <span className="flex items-center">
                <GameSelector />
                <SearchBar />
                <NamesComp />
            </span>
        </div>
    );
}

function NamesComp() {
    const [names, cleanNames] = usePokemonNamesContext();
    const [moves, cleanMoves] = usePokemonMovesContext();
    // console.log(names);
    // console.log(cleanNames);
    console.log(moves);
    return (
        <div>
            NAMES
        </div>
    );
}
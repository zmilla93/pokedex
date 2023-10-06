import { GameSelector } from "./GameSelector";
import { SearchBar } from "./SearchBox";

export function Navbar() {
    return (
        <div className="flex justify-between w-full m-1">
            <h1 className="text-red-500">Pokedex App</h1>
            <span className="flex">
                <GameSelector />
                <SearchBar />
            </span>
        </div>
    );
}
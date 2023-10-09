import { GameSelector } from "./GameSelector";
import { SearchBar } from "./SearchBox";

export function Navbar() {
    return (
        <div className="flex justify-between w-full p-2 border-b-2 border-b-blue-400 bg-gray-100">
            <h1 className="text-blue-400">Pokedex App</h1>
            <span className="flex items-center">
                <GameSelector />
                <SearchBar />
            </span>
        </div>
    );
}
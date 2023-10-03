import { Link, Outlet } from "react-router-dom";
import { SearchBar } from "../components/SearchBox";
import { GameSelector } from "../components/GameSelector";

export function PageWrapper() {
    return (
        <>
            <Link to="test">Test</Link>
            <div>
                <h3>Test Pokemon</h3>
                <div>
                    <Link to="pokemon/bulbasaur">Bulbasaur</Link>
                    <Link to="pokemon/mew">Mew</Link>
                    <Link to="pokemon/zapdos">Zapdos</Link>
                    <Link to="pokemon/fake">Fake</Link>
                </div>
            </div>
            <SearchBar />
            <GameSelector />
            <h1 className="text-red-500">Pokedex App</h1>
            <div className="flex justify-center bg-slate-400">
                <div className="bg-red-400 flex justify-center max-w-7xl">
                    <Outlet />
                </div>
            </div>

        </>
    );
}


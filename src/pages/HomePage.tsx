import { Link, useLocation } from "react-router-dom";
import { usePokemonArt } from "../hooks/usePokemonArt";
import { useTitle } from "../hooks/useTitle";
import { dataToCleanString } from "../utility/StringCleaning";

export function HomePage() {
    useTitle();
    return (
        <div className={`flex items-center h-full w-full`}>
            <div className="w-full bg-blue-300 m-20 py-20 flex rounded-lg">
                <ImageGrid />
                <div className="flex justify-center text-center bg-orange-400 w-full">
                    <HomePageContent />
                </div>
            </div>
        </div>
    );
}

function HomePageContent() {
    return (
        <p>
            This tool allows you to find information about the world of Pokemon!<br />To get started, search the name of either a Pokemon or Move at the top of the page.
            <br /><br />
            <button>Random Pokemon</button>
            <button>Random Move</button>
            <br /><br />
            Powered by the <a href="https://pokeapi.co/">PokeApi</a>.
        </p>
    );
}

function ImageGrid() {
    const location = useLocation();
    const randomArt = usePokemonArt(9);
    const images = randomArt.map(img => {
        return (
            <Link key={img.name} to={"/pokemon/" + img.name + location.search}>
                <img className=" max-h-36 max-w-36 hover:bg-orange-300 rounded-lg transition duration-300"
                    title={dataToCleanString(img.name)}
                    src={img.url} />
            </Link>
        );
    });
    return (
        <div className=" grid grid-cols-3 gap-8">
            {images}
        </div>
    );
}
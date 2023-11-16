import { Link, useLocation } from "react-router-dom";
import { NamedArt, usePokemonArt } from "../hooks/usePokemonArt";
import { useTitle } from "../hooks/useTitle";
import { dataToCleanString } from "../utility/StringCleaning";

export function HomePage() {
    useTitle();
    const seed = Date.now();
    return (
        <div className={`flex items-center h-full w-full justify-center`}>
            <div className="bg-blue-300 flex rounded-lg justify-center">
                <ImageGrid seed={seed} />
                <div className=" flex  text-center bg-orange-400 ">
                    <HomePageContent />
                </div>
            </div>
        </div>
    );
}

function HomePageContent() {
    return (
        <p className="bg-red-400 self-center">
            This tool allows you to find information about the world of Pokemon!<br />To get started, search the name of either a Pokemon or Move at the top of the page.
            <br /><br />
            <button>Random Pokemon</button>
            <button>Random Move</button>
            <br /><br />
            Powered by the <a href="https://pokeapi.co/">PokeApi</a>.
        </p>
    );
}

function ImageGrid({ seed }: { seed: number }) {
    const IMAGE_COUNT = 9;
    const randomArt = usePokemonArt(IMAGE_COUNT, seed);
    // Placeholder array is used to show blank cells while data is loaded
    const placeholderArray: undefined[] = [];
    if (randomArt.length === 0) {
        placeholderArray.length = IMAGE_COUNT;
        placeholderArray.fill(undefined, 0, IMAGE_COUNT);
    }
    const targetArray = randomArt.length === 0 ? placeholderArray : randomArt;
    let images: JSX.Element[] = [];
    images = targetArray.map((img, index) => {
        const key = img === undefined ? index : img.name;
        return <GridCell key={key} img={img} />;
    });
    return (
        <div className="m-4 grid grid-cols-3 gap-4">
            {images}
        </div>
    );
}

function GridCell({ img }: { img: NamedArt | undefined }) {
    const location = useLocation();
    const className = "h-36 max-h-36 w-36 max-w-36  hover:bg-orange-300 rounded-lg transition duration-300";
    if (img === undefined) return <div className={className}></div>;
    return (
        <Link key={img.name} to={"/pokemon/" + img.name + location.search}>
            <img className={className}
                title={dataToCleanString(img.name)}
                src={img.url} />
        </Link>
    );
}
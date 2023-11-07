import { MAX_WIDTH } from "../utility/defaults";
import { setTitle } from "../utility/util";


export function HomePage() {
    setTitle();
    return (
        <div className={`flex items-center h-full w-full`}>
            <div className="w-full bg-blue-300 m-20 py-20 flex rounded-lg">
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
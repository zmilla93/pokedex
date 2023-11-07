import { MAX_WIDTH } from "../utility/defaults";
import { setTitle } from "../utility/util";


export function HomePage() {
    setTitle();
    return (
        <div className={`flex items-center h-full bg-red-400 ${MAX_WIDTH}`}>
            <div>
                Homepage!
            </div>
        </div>
    );
}
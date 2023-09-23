import { Link, Outlet } from "react-router-dom";

export function PageWrapper() {
    return (
        <>
            <Link to="test">Test</Link>
            <h1 className="text-red-500">Pokedex App</h1>
            <div className="bg-red-400 flex justify-center">
                <Outlet />
            </div>
        </>
    )
}


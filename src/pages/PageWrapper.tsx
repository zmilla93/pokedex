import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";

export function PageWrapper() {
    return (
        <div id="pageWrapper" className="flex flex-col h-full">
            <ScrollToTop />
            <div id="header" className="flex flex-grow-0 flex-shrink bg-red-700">
                <Navbar />
            </div>
            <div id="pageContent"
                className="flex flex-col flex-grow flex-shrink bg-blue-700 overflow-auto items-center">
                <Outlet />
            </div>
        </div>
    );
}


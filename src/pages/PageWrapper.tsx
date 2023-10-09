import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";

export function PageWrapper() {
    return (
        <div id="pageWrapper" className="flex flex-col h-full">
            <ScrollToTop />
            <div id="header" className="flex flex-grow-0 flex-shrink">
                <Navbar />
            </div>
            <div id="pageContent"
                className="flex flex-col flex-grow flex-shrink overflow-auto items-center bg-blue-200">
                <div id="contentWrapper" className=" max-w-5xl bg-orange-200">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


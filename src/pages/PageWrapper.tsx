import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { useRef } from "react";

export function PageWrapper() {
    const scrollRef = useRef<HTMLDivElement>(null);
    return (
        <div id="pageWrapper" className="flex flex-col h-full">
            <div id="header" className="flex flex-grow-0 flex-shrink">
                <Navbar />
            </div>
            <div id="pageContent"
                className="flex flex-col flex-grow flex-shrink overflow-auto items-center bg-blue-200"
                ref={scrollRef}>
                <ScrollToTop targetRef={scrollRef} />
                <Outlet />
            </div>
        </div>
    );
}


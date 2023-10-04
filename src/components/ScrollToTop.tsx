import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname } = useLocation();
    console.log(location);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
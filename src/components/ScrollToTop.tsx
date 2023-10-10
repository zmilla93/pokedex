import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (targetRef.current != null) targetRef.current.scrollTo(0, 0);
    }, [pathname, targetRef]);
    return null;
}
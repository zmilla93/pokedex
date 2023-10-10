import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (targetRef != null && targetRef.current != null) {
            targetRef.current.scrollTo(0, 0);
            console.log("GO");
        }
    }, [pathname, targetRef]);
    return null;
}
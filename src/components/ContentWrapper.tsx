import { ReactNode } from "react";
import { MAX_WIDTH } from "../utility/defaults";

export function ContentWrapper({ children }: { children: ReactNode }) {
    return (
        <div id="contentWrapper" className={`${MAX_WIDTH} bg-orange-200`}>
            {children}
        </div>
    );
}
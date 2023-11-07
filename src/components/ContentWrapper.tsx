import { ReactNode } from "react";

export function ContentWrapper({ children }: { children: ReactNode }) {
    return (
        <div id="contentWrapper" className=" max-w-5xl bg-orange-200">
            {children}
        </div>
    );
}
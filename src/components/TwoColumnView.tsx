import { ReactNode } from "react";

interface TwoColumnViewProps {
    children: ReactNode;
}

export function TwoColumnView({ children }: TwoColumnViewProps) {
    const errorMessage = "TwoColumnView requires child elements!";
    if (!Array.isArray(children)) throw new Error(errorMessage);
    const childrenArr = children as Array<ReactNode>;
    if (childrenArr.length != 2) throw new Error(errorMessage);
    return (
        <div className="bg-lime-600 flex flex-col lg:flex-row max-w-7xl">
            <div className="w-full lg:w-1/2">
                {childrenArr[0]}
            </div>
            <div className="w-full lg:w-1/2">
                {childrenArr[1]}
            </div>
        </div>
    );
}

interface ColumnProps {
    children: ReactNode;
    className?: string;
    center?: boolean;
}

export function Column({ children, className = "", center = false }: ColumnProps) {
    if (center) className += " flex flex-col items-center";
    return (
        <div className={className}>
            {children}
        </div>
    );
}
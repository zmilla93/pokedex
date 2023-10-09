import { ReactNode } from "react";

interface TwoColumnViewProps {
    children: ReactNode;
    className?: string;
}

export function TwoColumnView({ children, className }: TwoColumnViewProps) {
    const errorMessage = "TwoColumnView requires child elements!";
    if (!Array.isArray(children)) throw new Error(errorMessage);
    const childrenArr = children as Array<ReactNode>;
    if (childrenArr.length != 2) throw new Error(errorMessage);
    const fullClassName = "flex flex-col lg:flex-row max-w-7xl " + className;
    return (
        <div className={fullClassName}>
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
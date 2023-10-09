interface CenterWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function CenterWrapper({ children, className = "flex" }: CenterWrapperProps) {
    return (
        <div className="h-full flex items-center">
            <div className={className}>
                {children}
            </div>
        </div>
    );
}
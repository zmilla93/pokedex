

export function Loader({ size = 24 }: { size?: number }) {
    return <span className="loader" style={{ width: size, height: size }} />;
}
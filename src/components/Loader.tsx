

export function Loader({ size = 36 }: { size?: number }) {
    return <span className="loader" style={{ width: size, height: size }} />;
}
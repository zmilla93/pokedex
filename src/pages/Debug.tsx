import { CenterWrapper } from "../components/CenterWrapper";
import { Loader } from "../components/Loader";

export function DebugView() {
    return (
        <CenterWrapper>
            <span className="mr-2 text-white">Loading Debug...</span>
            <Loader />
        </CenterWrapper>
    );
}
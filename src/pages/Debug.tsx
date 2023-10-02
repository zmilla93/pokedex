import { DebugSpriteViewer } from "../components/debug/DebugSpriteViewer";
import { DebugTypeViewer } from "../components/debug/DebugTypeViewer";

export function DebugView() {
    return (
        <div>
            <DebugTypeViewer />
            {/* <DebugSpriteViewer pokeName="mew" /> */}
        </div>
    );
}
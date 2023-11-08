import { CenterWrapper } from "../components/CenterWrapper";
import { ContentWrapper } from "../components/ContentWrapper";
import { Loader } from "../components/Loader";
import { DebugSpriteViewer } from "../components/debug/DebugSpriteViewer";

export function DebugView() {
    return (
        <ContentWrapper>
            <CenterWrapper>
                {/* <Loader /> */}
                {/* <span className="mr-2 text-white">Loading Debug...</span> */}
                <DebugSpriteViewer pokeName={"mew"} />

            </CenterWrapper>
        </ContentWrapper>

    );
}
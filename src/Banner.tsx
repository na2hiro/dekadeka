import React, {useCallback, useEffect, useState} from "react";
import fscreen from "fscreen";
import Editor from "./Editor";
import SettingsPanel from "./SettingsPanel";

type State = "viewing" | "editing" | "setting";

function useFullScreen() {
    const [isFullScreen, setFullScreen] = useState(false);
    useEffect(() => {
        fscreen.addEventListener("fullscreenchange", () => {
            setFullScreen(!!fscreen.fullscreenElement);
        });
    }, []);

    const exitFullScreen = useCallback(() => {
        fscreen.exitFullscreen();
    }, []);
    const enterFullScreen = useCallback(() => {
        document.body.focus();
        if (!isFullScreen) {
            fscreen.requestFullscreen(document.body);
        }
    }, []);

    return {
        isFullScreen,
        enterFullScreen,
        exitFullScreen,
    }
}

const Banner = () => {
    const [state, setState] = useState<State>("viewing");
    const {isFullScreen, enterFullScreen, exitFullScreen} = useFullScreen();
    useEffect(() => {
        const handler = (e) => {
            if (e.target.classList.contains("banner")) {
                setState("viewing");
            }
        }
        document.body.addEventListener("click", handler);

        return () => document.body.removeEventListener("click", handler);
    }, []);

    return (
        <>
            {state != "viewing" &&
                <div className="control">
                    {isFullScreen && fscreen.fullscreenEnabled && (
                        <button onClick={exitFullScreen}>Exit fullsreen</button>
                    )}
                    {<button onClick={() => {
                        setState("viewing");
                        enterFullScreen();
                    }}>View</button>}
                    {<button onClick={() => {
                        console.log("onclick setting")
                        setState("setting")
                    }}>Settings</button>}
                </div>
            }
            <Editor onFocus={() => {
                setState("editing")
            }}/>
            {state === "setting" && <SettingsPanel onClose={()=>setState("viewing")}/>}
        </>
    );
};

export default Banner;

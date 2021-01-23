import React, {useCallback, useEffect, useRef, useState} from "react";
import fitty, {FittyInstance} from "fitty";
import fscreen from "fscreen";

const LOCAL_STORAGE_KEY = "dekadeka:banner-text";

const Banner = () => {
    const [isEditing, setEditing] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    const [fty, setFty] = useState<FittyInstance | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        fscreen.addEventListener("fullscreenchange", () => {
            setFullScreen(!!fscreen.fullscreenElement);
        });
    }, [])
    useEffect(() => {
        setFty(fitty(ref.current!));

        return () => {
            if (fty) {
                fty.unsubscribe();
            }
        }
    }, []);
    useEffect(() => {
        try {
            const restored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (restored && ref.current) {
                ref.current.textContent = restored;
            }
        } catch (e) {

        }
    }, []);

    const onExitFullscreenClick = useCallback(() => {
        fscreen.exitFullscreen();
    }, []);
    const onViewClick = useCallback(() => {
        document.body.focus();
        if (!isFullScreen) {
            fscreen.requestFullscreen(document.body);
        }
    }, []);
    const onKeyPress = useCallback(() => {
        if (ref.current) {
            localStorage.setItem(LOCAL_STORAGE_KEY, serialize(ref.current));
        }
    }, []);
    const onFocus = useCallback(() => {
        setEditing(true);
    }, []);
    const onBlur = useCallback(() => {
        setTimeout(() => {
            setEditing(false);
        }, 100)
    }, []);

    return <>
        {isEditing && (
            <div className="control">
                {isFullScreen && fscreen.fullscreenEnabled && (
                    <button onClick={onExitFullscreenClick}>Exit fullsreen</button>
                )}
                {<button onClick={onViewClick}>View</button>}
            </div>
        )}
        <div className="banner">
            <div ref={ref} contentEditable={true} onKeyUp={onKeyPress} onFocus={onFocus} onBlur={onBlur}>
                Hello world
            </div>
        </div>
    </>;
}

function serialize(dom: Node) {
    const [, ret] = serializeInner(dom);
    return ret;

    function serializeInner(dom: Node): [boolean, string] {
        if (dom.nodeType === Node.TEXT_NODE) {
            return [false, dom.textContent!];
        }

        let ret = "";
        for (let i = 0; i < dom.childNodes.length; i++) {
            let [nl, str] = serializeInner(dom.childNodes[i]);
            ret += `${i > 0 && nl ? "\n" : ""}${str}`;
        }
        return [dom.nodeName.toLowerCase() === "div", ret];
    }
}


export default Banner;

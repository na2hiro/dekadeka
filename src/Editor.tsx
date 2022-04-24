import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import fitty, {FittyInstance} from "fitty";
import {useSettings} from "./context/settingsContext";

/**
 * Add hook for fitty to change font size to fit container
 * @param ref
 */
function useFitty(ref: React.RefObject<HTMLElement>) {
    const [fty, setFty] = useState<FittyInstance | null>(null);
    useEffect(() => {
        setFty(fitty(ref.current!));

        return () => {
            if (fty) {
                fty.unsubscribe();
            }
        };
    }, []);
}

const LOCAL_STORAGE_KEY = "dekadeka:banner-text";

/**
 * Add hook so text content is synced with local storage value
 * @param ref
 */
function useLocalStorageSyncedTextContent(ref: React.RefObject<HTMLElement>) {
    useLayoutEffect(() => {
        try {
            const restored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (ref.current) {
                ref.current.textContent = restored || "Hello, world!";
            }
        } catch (e) {
        }
    }, []);
    const onChangeText = useCallback(() => {
        if (ref.current) {
            localStorage.setItem(LOCAL_STORAGE_KEY, serialize(ref.current));
        }
    }, []);

    return {onChangeText};

    function serialize(dom: Node) {
        const [, ret] = serializeInner(dom);
        return ret;

        function serializeInner(dom: Node): [boolean, string] {
            if (dom.nodeType === Node.TEXT_NODE) {
                return [false, dom.textContent!];
            }

            let ret = "";
            for (let i = 0; i < dom.childNodes.length; i++) {
                const [nl, str] = serializeInner(dom.childNodes[i]);
                ret += `${i > 0 && nl ? "\n" : ""}${str}`;
            }
            return [dom.nodeName.toLowerCase() === "div", ret];
        }
    }
}

type Props = {
    onFocus: () => void;
}
const Editor: React.VFC<Props> = ({onFocus}) => {
    const ref = useRef<HTMLDivElement>(null);
    useFitty(ref);
    const {onChangeText} = useLocalStorageSyncedTextContent(ref);
    const [{isBold}] =useSettings();

    return (
        <div className={`banner ${isBold ? "bold" : ""}`}>
            <div
                ref={ref}
                contentEditable={true}
                onKeyUp={onChangeText}
                onFocus={onFocus}
            />
        </div>
    )
}

export default Editor;
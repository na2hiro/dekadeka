import React, { useCallback, useState } from "react";

const Dekadeka = () => {
    const [text, setText] = useState("");
    const onChangeTextarea = useCallback((e)=>{
        setText(e.target.value);
    }, []);
    const onClickRemove = useCallback(()=>{
        setText("");
    }, []);

    const [fontSize, setFontSize] = useState(100);
    const onChangeSlider = useCallback((e)=>{
        setFontSize(e.target.value);
    }, []);

    // TODO detect isFull
    const [isFull, setFull] = useState(false);
    const onClickFull = useCallback(() => {
        const fullElem = document.documentElement;
        let f;
        if (!isFull) {
            f = fullElem.requestFullscreen || (fullElem as any).mozRequestFullscreen || (fullElem as any).webkitRequestFullscreen || function() {
                alert("ブラウザが全画面非対応です");
            };
            f.bind(fullElem)();
        } else {
            f = document.exitFullscreen || (document as any).mozCancelFullscreen || (document as any).webkitCancelFullscreen || function() {
                alert("ブラウザが全画面非対応です");
            };
            f.bind(document)();
        }
        setFull(!isFull);
    }, [isFull]);

    return <>
        <div>
            <button onClick={onClickRemove}>消</button>
            <button onClick={onClickFull}>全</button>
            <input onChange={onChangeSlider} type="range" min="10" max="500" value={fontSize} style={{ width: "50%" }}/>
            <span id="size"/>
            (10 to 500)
        </div>
        <textarea onChange={onChangeTextarea} style={{ height: "100%", width: "100%", fontSize: `${fontSize}px` }}
                  placeholder="デカデカと表示する" value={text}/>
    </>;
};

export default Dekadeka;

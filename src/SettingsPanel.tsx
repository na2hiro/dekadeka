import React from "react";
import {useSettings} from "./context/settingsContext";

const SettingsPanel: React.VFC<{ onClose: () => void }> = ({}) => {
    const [{isBold, bgColor, textColor}, setSetting] = useSettings()
    return (
        <div className="settings">
            <h1>
                Settings
            </h1>
            <div className="options">
                <label>
                    <input name="bold" type="checkbox" checked={isBold}
                           onChange={(e) => setSetting({isBold: e.currentTarget.checked})}/> Bold
                </label>
            </div>
            <div className="options">
                <label>
                    <input type="color" name="textColor" value={textColor}
                           onChange={(e) => setSetting({textColor: e.currentTarget.value})}
                    /> Text
                </label>
            </div>
            <div className="options">
                <label>
                    <input type="color" name="bgColor" value={bgColor}
                           onChange={(e) => setSetting({bgColor: e.currentTarget.value})}
                    /> Background
                </label>
            </div>
        </div>
    )
}

export default SettingsPanel;

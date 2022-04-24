import React from "react";
import {useSettings} from "./context/settingsContext";

const SettingsPanel: React.VFC<{ onClose: () => void }> = ({onClose}) => {
    const [setting, setSetting] = useSettings()
    return (
        <div className="settings">
            <h1>
                <button onClick={onClose}>x</button>
                Settings
            </h1>
            <label>
                <input name="bold" type="checkbox" checked={setting.isBold}
                       onChange={(e) => setSetting({isBold: e.currentTarget.checked})}/> Bold
            </label>
        </div>
    )
}

export default SettingsPanel;

import React from "react";
import ReactDOM from "react-dom";
import Banner from "./Banner";

import "./main.scss";

import {useRegisterSW} from "virtual:pwa-register/react";
import {SettingsContextProvider} from "./context/settingsContext";

const Main = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line prefer-template
            console.log("SW Registered: " + r);
        },
        onRegisterError(error) {
            console.log("SW registration error", error);
        },
        onNeedRefresh() {
            if (confirm(`Newer version is available. Refresh to update?`)) {
                updateServiceWorker(true);
            }
        },
        onOfflineReady() {
            console.log("offline ready");
        },
    });

    return <SettingsContextProvider>
        <Banner/>
    </SettingsContextProvider>;
};

ReactDOM.render(<Main/>, document.getElementById("main"));

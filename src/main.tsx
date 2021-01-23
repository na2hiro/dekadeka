import React from "react";
import ReactDOM from "react-dom";
import Banner from "./Banner";
import {Workbox} from "workbox-window"

import "./main.scss";

ReactDOM.render(<Banner/>, document.body);

if ("serviceWorker" in navigator) {
    const wb = new Workbox("sw.js");
    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            if (confirm(`Newer version is available. Refresh to update?`)) {
                window.location.reload();
            }
        }
    });
    wb.register();
}

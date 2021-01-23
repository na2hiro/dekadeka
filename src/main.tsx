import React from "react";
import ReactDOM from "react-dom";
import Banner from "./Banner";

import "./main.scss";

ReactDOM.render(<Banner/>, document.body);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").then(registration => {
            console.log("SW registered: ", registration);
        }).catch(registrationError => {
            console.log("SW registration failed: ", registrationError);
        });
    });
}

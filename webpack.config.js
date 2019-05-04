const path = require("path");
const fs = require("fs");
const cleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const pwaManifestPlugin = require("webpack-pwa-manifest");

const GA_SNIPPET_PATH = "./assets/google-analytics-snippet.html";
let gaSnippet = "";
if (fs.existsSync(GA_SNIPPET_PATH)) {
    gaSnippet = fs.readFileSync(GA_SNIPPET_PATH).toString();
}

module.exports = {
    entry: "./src/main.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new cleanPlugin({}),
        new HtmlWebpackPlugin({
            title: "Dekadeka",
            favicon: "./assets/favicon.ico",
            meta: {
                "viewport": "width=device-width, initial-scale=1"
            },
            template: "assets/template.html",
            templateParameters: {
                ga: gaSnippet
            }
        }),
        new pwaManifestPlugin({
            "name": "Dekadeka",
            "short_name": "Dekadeka",
            "start_url": "/dekadeka/",
            "background_color": "#2B9EEB",
            "theme_color": "#2B9EEB",
            "orientation": "any",
            "icons": [
                {
                    "src": "./assets/icon-192x192.png",
                    "sizes": "192x192",
                    "destination": "assets"
                },
                {
                    "src": "./assets/icon-512x512.png",
                    "sizes": "512x512",
                    "destination": "assets"
                }
            ]
        }),
        new workboxPlugin.InjectManifest({
            swSrc: "./src/sw.js",
            swDest: "sw.js"
        })
    ],
    devServer: {
        contentBase: "./dist",
        publicPath: "/dekadeka/",
        openPage: "dekadeka/"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "dekadeka.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dekadeka/"
    }
};

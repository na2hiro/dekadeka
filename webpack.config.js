const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const pwaManifestPlugin = require('webpack-pwa-manifest');

module.exports = {
    entry: './src/main.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
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
        new workboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    devServer: {
        contentBase: "./dist",
        publicPath: "/dekadeka/",
        openPage: "dekadeka/"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'dekadeka.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dekadeka/"
    }
};

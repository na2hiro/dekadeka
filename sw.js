importScripts("/dekadeka/precache-manifest.a943f5e6edadf2c313af62dad9fdf93f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute(self.__precacheManifest);


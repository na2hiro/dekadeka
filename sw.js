importScripts("/dekadeka/precache-manifest.8437e99ae57ce0f5a01546d3290aa01b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute(self.__precacheManifest);


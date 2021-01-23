importScripts("/dekadeka/precache-manifest.7a96fbf4dac0f07b7396b2b18d4b5cd7.js", "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute(self.__precacheManifest);


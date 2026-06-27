const CACHE = "gym-tracker-v1";

const arquivos = [
    "/",
    "/index.html",
    "/treinos.html",
    "/historico.html",
    "/configuracoes.html",
    "/style.css",
    "/treinos.css",
    "/historico.css",
    "/configuracoes.css",
    "/script.js",
    "/treinos.js",
    "/historico.js",
    "/configuracoes.js",
    "/storage.js"
];

self.addEventListener("install", e => {

    e.waitUntil(

        caches.open(CACHE).then(cache => {

            return cache.addAll(arquivos);

        })

    );

});

self.addEventListener("fetch", e => {

    e.respondWith(

        caches.match(e.request).then(resp => {

            return resp || fetch(e.request);

        })

    );

});
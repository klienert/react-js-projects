import { lazy } from 'react';

const metas = import.meta.glob("./*/meta.js", { eager: true });
const entries = import.meta.glob("./*/index.jsx");

export const demos = Object.entries(entries)
    .map(([entryPath, importer]) => {
        const metaPath = entryPath.replace('/index.jsx', '/meta.jsx');
        const metaMod = metas[metaPath];
        const meta = metaMod?.default || {};

        const path = meta.path || entryPath.split('/').slice(-2, -1)[0].toLowerCase();
        
        return {
            name: meta.name || path,
            path,   // 'wordle'
            route: `/demos/${path}`,
            tags: meta.tags || [],
            component: lazy(importer),
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
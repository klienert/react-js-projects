const metas = import.meta.glob("./*/meta.js", { eager: true });
const entries = import.meta.glob("./*/index.jsx");

// const titleFromPath = (p) => {
//     const folder = p.split('/').slice(-2, -2)[0] || "Demo";
//     return folder 
//         .replace(/[-_]/g, " ")
//         .replace(/\b\w/g, (c) => c.toUpperCase())
// }

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
            component: importer,
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
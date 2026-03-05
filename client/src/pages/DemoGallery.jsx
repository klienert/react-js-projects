import { useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import { demos } from "../demos/registry";

const DemoGallery = () => {
    const [q, setQ] = useState("");
    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return demos;
        return demos.filter(d => 
            d.name.toLowerCase().includes(term) ||
            d.tags.join(' ').toLowerCase().includes(term) ||
            d.path.toLowerCase().includes(term)
        );
    }, [q]);

    return (
        <div style={{padding: 16}}>            
            <h2>Demo Gallery</h2>
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Demos..."
                style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            <ul>
                {filtered.map((d) => (
                    <li key={d.route}>
                        <Link to={d.route}>{d.name}</Link>
                        {d.tags?.length ? <span> - {d.tags.join(", ")}</span> : null}
                    </li>
                ))}
            </ul>            
        </div>
    );
}

export default DemoGallery;
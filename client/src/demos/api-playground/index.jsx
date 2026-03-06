import { useState } from "react";

const api = async (path, options = {}) => {
    const res = await fetch(path, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        credentials: 'include',
        ...options,
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
        const msg = typeof data === 'string' ? data : data?.error || "Request failed";
        throw new Error(msg);
    }

    return data;    
}

const ApiPlayground = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const run = async (fn) => {
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const data = await fn();
            setResult(data);
        } catch (e) {
            setError(e.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 16, maxWidth: 900 }}>
        <h1 style={{ marginTop: 0 }}>API Playground</h1>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <button disabled={loading} onClick={() => run(() => api("/api/health"))}>
                GET /api/health
            </button>

            <button disabled={loading} onClick={() => run(() => api("/api/time"))}>
                GET /api/time
            </button>

            <button
                disabled={loading}
                onClick={() =>
                    run(() =>
                    api("/api/echo", {
                        method: "POST",
                        body: JSON.stringify({
                        message: "Hello from client",
                        at: new Date().toISOString(),
                        }),
                    })
                    )
                }
            >
                POST /api/echo
            </button>

            <button disabled={loading} onClick={() => run(() => api("/api/error"))}>
                GET /api/error (expect 400)
            </button>

            {/* <button disabled={loading} onClick={() => run(() => api("/api/boom"))}>
                GET /api/boom (it's fake...)
            </button> */}

        </div>

        {loading && <div>Loading…</div>}

        {error && (
            <div style={{ padding: 12, border: "1px solid #ccc", marginTop: 12 }}>
                <strong>Error:</strong> {error}
            </div>
        )}

        {result && (
            <pre style={{ padding: 12, border: "1px solid #ccc", marginTop: 12, overflowX: "auto" }}>
                {JSON.stringify(result, null, 2)}
            </pre>
        )}

        <p style={{ marginTop: 12 }}>
            This uses <code>fetch("/api/...")</code> and relies on the Vite proxy in{" "}
            <code>vite.config.js</code> to forward to your server.
        </p>
        </div>
    );
}


export default ApiPlayground;
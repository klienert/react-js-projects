"use client";

import { useEffect, useState } from "react";

export default function Post() {
    const [id, setId] = useState(1);

    return (
        <div className="container">
            <button className="btn btn-primary px-4 py-2">
                Show me a different Post
            </button>

            <PostBody />
        </div>
    )
}

export function PostBody() {
    const [text, setText] = useState("");

    useEffect(() => {}, []);

    return <p>{text}</p>
}
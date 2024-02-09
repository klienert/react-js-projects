"use client";

import { useEffect, useState } from "react";

export default function BlogPost() {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true); // for a loading message and to check that the json is loaded before rendering
    const [text, setText] = useState('');

    useEffect(() => {
        fetch("https://dummyjson.com/posts/2")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setPost(data);
                setLoading(false);
            })
    }, []);

    return (
        <div className="container">
            {/* <article> */}
                {/* 
                    <h1>{post.title}</h1>
                    <p>{post.body}</p> 
                */}
                {/* 
                Optional Chaining...
                Adding '?' after the useState param
                 */}
                {/* 
                    <h1>{post?.title}</h1>
                    <p>{post?.body}</p> 
                */}
            {/* </article> */}

            {/* Better option is to create a conditional for loading */}
            <article>
                {loading ? (
                    "Loading..."
                ) : (
                    <>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    </>
                )}
            </article>
        </div>
    )
}


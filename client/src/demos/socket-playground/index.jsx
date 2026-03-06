import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import './styles.css';

const SocketPlayground = () => {
    const socketRef = useRef(null);
    const [status, setStatus] = useState('disconnected');
    const [messages, setMessages] = useState([]);

    const add = (m) => {
        setMessages((prev) => [{ at: new Date().toISOString(), ...m}, ...prev]);        
    }

    useEffect(() => {
        // Same origin works because you're using Vite proxy for /api,
        // but Socket.IO defaults to the current origin for ws/http polling too.
        const socket = io("/", {
        withCredentials: true,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            setStatus("connected");
            add({ type: "connect", data: { id: socket.id } });
        });

        socket.on("disconnect", () => {
            setStatus("disconnected");
            add({ type: "disconnect", data: {} });
        });

        socket.on("server:hello", (data) => add({ type: "server:hello", data }));
        socket.on("server:pong", (data) => add({ type: "server:pong", data }));

        socket.on("connect_error", (err) => {
            add({ type: "connect_error", data: { message: err.message } });
        });

        return () => socket.close();
    }, []);

    const ping = () => {
        socketRef.current?.emit("client:ping", { message: "ping from client" });
        add({ type: "client:ping", data: { message: "ping from client" } });
    };

    return (
        <div className="socket-playground">
            <h2 className="socket-header">Socket Playground</h2>
            <div className="socket-status">
                Status: <strong>{status}</strong>
            </div>
            <button 
                className={`btn btn-primary`}
                onClick={ping}
                disabled={status !== "connected"}
            >
                Send Ping!
            </button>
            <h3>Events</h3>
            <pre className="socket-msg">
                {JSON.stringify(messages, null, 2)}
            </pre>
        </div>
    )
}

export default SocketPlayground;
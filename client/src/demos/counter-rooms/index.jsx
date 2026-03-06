import { useEffect, useState, useMemo, useRef } from "react";
import { io } from "socket.io-client";
import './styles.css';

const CounterRooms = () => {
    const socketRef = useRef(null);

    const [status, setStatus] = useState("disconnected");
    const [roomInput, setRoomInput] = useState("lobby");
    const [room, setRoom] = useState("");
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState([]);

    const canAct = status === "connected" && !!room;

    const addEvent = (type, data) => {
        setEvents((prev) => [{ at: new Date().toISOString(), type, data }, ...prev].slice(0, 50));
    };

    useEffect(() => {
        const socket = io("/", { withCredentials: true });
        socketRef.current = socket;

        socket.on("connect", () => {
            setStatus("connected");
            addEvent("connect", { id: socket.id });
        });

        socket.on("disconnect", () => {
            setStatus("disconnected");
            addEvent("disconnect", {});
        });

        socket.on("counter:state", ({ room: r, count: c }) => {
            setRoom(r);
            setCount(c);
            addEvent("counter:state", { room: r, count: c });
        });

        socket.on("room:user_joined", (payload) => addEvent("room:user_joined", payload));

        socket.on("connect_error", (err) => addEvent("connect_error", { message: err.message }));

        return () => socket.close();
    },[]);

    const join = () => {
        const r = roomInput.trim();
        if (!r) return;
        socketRef.current?.emit("room:join", { room: r });
        addEvent("room:join", { room: r });
    };

    const inc = (by) => {
        socketRef.current?.emit("counter:inc", { room, by });
        addEvent("counter:inc", { room, by });
    };

    const reset = () => {
        socketRef.current?.emit("counter:reset", { room });
        addEvent("counter:reset", { room });
    };

    const setTo = (value) => {
        socketRef.current?.emit("counter:set", { room, count: value });
        addEvent("counter:set", { room, count: value });
    };

    const title = useMemo(() => `Counter Rooms — ${room || "no room"}`, [room]);

    return (
         <div className="counter-rooms">
            <h1>{title}</h1>

            <div className="counter-room-status">
                <strong>Status:</strong> {status}
                {"  "}
                <strong style={{ marginLeft: 12 }}>Socket:</strong> {socketRef.current?.id || "(none)"}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <input
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    placeholder="room name (e.g. lobby)"
                />
                <button onClick={join} disabled={status !== "connected"}>
                    Join room
                </button>
            </div>

            <div style={{ marginBottom: 12 }}>
                <strong>Room:</strong> {room || "(not joined)"}
            </div>

            <div style={{ fontSize: 32, marginBottom: 12 }}>
                <strong>{count}</strong>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button disabled={!canAct} onClick={() => inc(1)}>
                    +1
                </button>
                <button disabled={!canAct} onClick={() => inc(-1)}>
                    -1
                </button>
                <button disabled={!canAct} onClick={reset}>
                    Reset
                </button>
                <button disabled={!canAct} onClick={() => setTo(100)}>
                    Set to 100
                </button>
            </div>

            <p style={{ marginTop: 12 }}>
                Open this demo in two tabs, join the same room, then click +1. Both should update instantly.
            </p>

            <h3>Recent events</h3>
            <pre style={{ padding: 12, border: "1px solid #ccc", marginTop: 12, overflowX: "auto" }}>
                {JSON.stringify(events, null, 2)}
            </pre>
            </div>
    )
}

export default CounterRooms;
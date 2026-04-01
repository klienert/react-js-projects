import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000';

const useNotifications = (userId) => {
    const socketRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io(SOCKET_URL, { withCredentials: true });
        socketRef.current = socket;

        socket.on('connect', () => {
            setConnected(true);
            if (userId) socket.emit('user:join', { userId })
        });

        socket.on('notification:new', (notification) => {
            setNotifications(prev => [notification, ...prev]); // newest first
        });

        socket.on('disconnec', () => {
            setConnected(false);
        });

        return socket.disconnect(); // cleanup on unmount
    },[userId]);

    const dismiss = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const dismissAll = () => setNotifications([]);

    return { notifications, connected, dismiss, dismissAll }
}

export default useNotifications;
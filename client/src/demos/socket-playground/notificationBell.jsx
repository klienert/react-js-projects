import useNotifications from "../../hooks/useNotifications";

export default function NotificationBell({ userId }) {
    const { notifications, connected, dismiss, dismissAll } = useNotifications(userId);
    const unread = notifications.length;

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>

            {/* Bell icon with badge */}
            <button onClick={() => {}}>
                🔔
                {unread > 0 && (
                    <span style={{
                        position: 'absolute', top: -4, right: -4,
                        background: 'red', color: 'white',
                        borderRadius: '50%', fontSize: 11,
                        padding: '2px 5px'
                    }}>
                        {unread}
                    </span>
                )}
            </button>

            {/* Connection status (helpful during dev) */}
            <span style={{ fontSize: 10, color: connected ? 'green' : 'gray' }}>
                {connected ? '● live' : '○ offline'}
            </span>

            {/* Notification list */}
            {unread > 0 && (
                <div style={{
                    position: 'absolute', right: 0, top: 30,
                    background: 'white', border: '1px solid #ddd',
                    borderRadius: 8, width: 300, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px' }}>
                        <strong>Notifications</strong>
                        <button onClick={dismissAll}>Clear all</button>
                    </div>
                    {notifications.map(n => (
                        <div key={n.id} style={{ padding: '8px 12px', borderTop: '1px solid #eee' }}>
                            <strong>{n.title}</strong>
                            <p style={{ margin: '2px 0', fontSize: 13 }}>{n.message}</p>
                            <button onClick={() => dismiss(n.id)} style={{ fontSize: 11 }}>✕ dismiss</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
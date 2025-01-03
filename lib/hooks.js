const { useRef, useEffect } = require("react")
const { io } = require("socket.io-client")

const useWebSocketConnectionHook = (cb, event) => {
    const socketRef = useRef(null)

    const socketClient = ( ) => {
        const socket = io({transports: ['websocket']});

        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        socket.on('connect_error', async (error) => {
            console.error('WebSocket error:', error);
            await fetch('/api/socket');
        });


        socket.on('message', (data) => {
            console.log('Received message:', data);
        });
        socketRef.current = socket;
    }


    useEffect(() => {
        socketClient();

        return () => {
            socketRef?.current?.disconnect();
        }
    }, [])
}


export default useWebSocketConnectionHook;
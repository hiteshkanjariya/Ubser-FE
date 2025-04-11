import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const socket = io(SOCKET_URL, {
    autoConnect: false,
    // withCredentials: true,
});

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
    },
    reducers: {
        connectSocket: (state) => {
            if (!state.socket) {
                socket.connect();
                state.socket = socket;
            }
        },
        disconnectSocket: (state) => {
            if (state.socket) {
                socket.disconnect();
                state.socket = null;
            }
        },
    },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
export { socket };

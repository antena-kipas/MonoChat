import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client"



// @ts-ignore
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //check user authenticated 
    const checkAuth = async () => {
        try {
            const {data} = await axios.get("/api/auth/check");
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            } else {
                // If check fails, clear any invalid token
                localStorage.removeItem("token");
                setToken(null);
            }
        } catch (error) {
            toast.error(error.message);
            // Also clear token on error
            localStorage.removeItem("token");
            setToken(null);
        }
    }


    //Login function to handle user authetication and socket connection
    const login = async (state, credentials)=>{
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);
            if (data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                // FIX: Changed "tokens" to "token"
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

// Logout function to handle user logout and socket disconnection
    const logout = async () => {
        // FIX: Check if socket exists before disconnecting
        if (socket) {
            socket.disconnect();
        }
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out succesfully");
    }

    //Update profile function to handle user profile updates
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body);
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Connect socket function to handle socket connection and online users updates
    const connectSocket = (userData) =>{
        if(!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds)=> {
            setOnlineUsers(userIds);
        })
    }

    useEffect(()=>{
        // FIX: Only run checkAuth if a token exists
        if(token){
            axios.defaults.headers.common["token"] = token;
            checkAuth();
        }
    },[])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

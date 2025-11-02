// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user once when app loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrUser(user);
            } catch (err) {
                console.error("Auth check failed:", err);
                setCurrUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await logoutUser();
            setCurrUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ currUser, setCurrUser, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

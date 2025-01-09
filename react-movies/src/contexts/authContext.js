import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    const authenticate = (username, password) => {
        // Simulate authentication
        if (username && password) {
            setIsAuthenticated(true);
            setUserName(username);
        }
    };

    const register = (username, password) => {
        if (username && password) {
            console.log(`User registered: ${username}`);
            setIsAuthenticated(true);
            setUserName(username);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserName('');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, authenticate, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

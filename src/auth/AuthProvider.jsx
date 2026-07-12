/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AuthService from './AuthService';
import api from "../services/api";
import { AuthContext } from './UseAuth';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('jwtToken'));
    const [loading, setLoading] = useState(false);


    const user = useMemo(() => {
        return token ? { isAuthenticated: true } : null;
    }, [token]);


    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = useCallback(async (email, senha) => {
        try {
            setLoading(true);
            const data = await AuthService.login(email, senha);
            const newToken = data.token;
            setToken(newToken);
            localStorage.setItem('jwtToken', newToken);
            return true;
        } catch (error) {
            console.error("Erro no login:", error);
            setToken(null);
            localStorage.removeItem('jwtToken');
            throw error;
        } finally {
            setLoading(false); 
        }
    }, []);

    const register = useCallback(async (nome, email, senha,role) => {
        try {
            setLoading(true); 
            const data = await AuthService.register(nome, email, senha,role);
            const newToken = data.token;
            setToken(newToken);
            localStorage.setItem('jwtToken', newToken);
            return true;
        } catch (error) {
            console.error("Erro no registro:", error);
            setToken(null);
            localStorage.removeItem('jwtToken');
            throw error;
        } finally {
            setLoading(false); 
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('jwtToken');
    }, []);

    const value = { user, token, loading, login, register, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    login: () => void;
    logout: () => void;
    isLoading: boolean;
    token: string | null;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
    login: () => { },
    logout: () => { },
    isLoading: false,
    token: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    const login = async () => {
        setIsLoading(true);
        setToken('qwdjoiqwdj');
        await AsyncStorage.setItem('token', "hfgalkwfhe")
        setIsLoading(false)
    };

    const logout = async () => {
        setToken(null);
        setIsLoading(false);
        await AsyncStorage.removeItem('token')
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            const token = await AsyncStorage.getItem('token')
            setToken(token)
            setIsLoading(false)
        } catch (error) {
            console.log('logged in error: ' + error)
        }
        setIsLoading(false);
    };

    useEffect(() => {
        isLoggedIn()
    }, [])



    return (
        <AuthContext.Provider value={{ login, logout, isLoading, token }}>
            {children}
        </AuthContext.Provider>
    );
};
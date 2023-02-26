import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { extractErrorMessage } from '../Utils/extractError';
import { SubmitHandler } from 'react-hook-form';
import { ToastAndroid } from 'react-native';
import CredentialsModel from './../Models/CredentialsModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from './../Services/AuthServices';

export type AuthContextType = {
    login: (credentials: CredentialsModel) => Promise<void>
    logout: () => void;
    isLoading: boolean;
    token: string | null;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
    login: (credentials: CredentialsModel): Promise<void> => {
        return Promise.resolve();
    },
    logout: () => { },
    isLoading: false,
    token: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);


    const login: SubmitHandler<CredentialsModel> = async (credentials): Promise<void> => {

        try {
            const token = await authService.login(credentials)
            if (token) {
                setIsLoading(true);
                setToken(token)
                await AsyncStorage.setItem("token", token);
                ToastAndroid.show("התחברת בהצלחה!", 5000);
            }

        } catch (error: any) {
            ToastAndroid.show(extractErrorMessage(error), 5000);
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    };

    const logout = async () => {
        setIsLoading(true)
        await authService.logout()
        setToken(null);
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let token = await AsyncStorage.getItem('token')
            setToken(token)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            console.log('logged in error: ' + error)
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
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
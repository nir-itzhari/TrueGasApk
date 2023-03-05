import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { extractErrorMessage } from '../Utils/extractError';
import { SubmitHandler } from 'react-hook-form';
import { ToastAndroid } from 'react-native';
import CredentialsModel from './../Models/CredentialsModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from './../Services/AuthServices';
import store from '../redux/Store';
import jwtDecode from 'jwt-decode';
import { logoutAction } from '../redux/AuthState';

export type AuthContextType = {
    login: (credentials: CredentialsModel) => Promise<void>
    logout: () => void;
    isLoading: boolean;
    token: string | null;
    user_id: string | null;
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
    user_id: null
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user_id, setUser] = useState<string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);


    const login: SubmitHandler<CredentialsModel> = async (credentials): Promise<void> => {
        setIsLoading(true);
        try {
            let tokenTesting = "kittens"
            // const token = await authService.login(credentials)
            if (tokenTesting) {
                setToken(tokenTesting)
                // await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("token", tokenTesting);
                ToastAndroid.show("התחברת בהצלחה!", 5000);
                // const user = store.getState().authState.user.user_id;
                // setUser(user)
                // console.log(user)
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
        try {
            await authService.logout()
            setToken(null);
            setTimeout(() => {
                setIsLoading(false)
            }, 500)

        } catch (error) {
            console.log("LogOut Error: " + error)
        }
    };

    const isLoggedIn = async () => {
        setIsLoading(true)
        try {
            let token = await AsyncStorage.getItem('token')
            if (token) {
                // const encodedObject: any = jwtDecode(token);
                // store.getState().authState.user = encodedObject.user
                // setUser(encodedObject.user._id)
                // console.log(encodedObject.user)
                setToken(token)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            }
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
        <AuthContext.Provider value={{ login, logout, isLoading, token, user_id }}>
            {children}
        </AuthContext.Provider>
    );
};
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import config from './../Utils/Config';

interface ApiContextType {
    isInternetReachable: boolean | null;
    isServerOnline: boolean | null;
}

const ApiContext = createContext<ApiContextType>({
    isInternetReachable: null,
    isServerOnline: null,
});

export const useApi = () => useContext(ApiContext);

interface ApiContextProviderProps {
    children: React.ReactNode; // Add children prop here
}

const ApiContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => { // Add children prop to props destructuring
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);
    const [isServerOnline, setIsServerOnline] = useState<boolean | null>(null);

    useEffect(() => {

        // Check internet connectivity
        NetInfo.fetch().then((state) => setIsInternetReachable(state.isInternetReachable));
        const unsubscribeFromNetInfo = NetInfo.addEventListener((state) =>
            setIsInternetReachable(state.isInternetReachable)
        );

        // Check server availability
        axios
            .get(config.baseUrl + 'checkStatus')
            .then(() => setIsServerOnline(true))
            .catch(() => setIsServerOnline(false));

        return () => {
            unsubscribeFromNetInfo();
        };
    }, []);

    return (
        <ApiContext.Provider value={{ isInternetReachable, isServerOnline }}>
            {children} 
        </ApiContext.Provider>
    );
};

export default ApiContextProvider;
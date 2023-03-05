import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ClientModel } from "../Models/ClientModel";
import config from "../Utils/Config";

interface Picker {
    id: string
    title: string
}

type ClientContextType = {
    client: Picker | null
    setClient: (client: Picker) => void;
};

const ClientContext = createContext<ClientContextType>({
    client: null,
    setClient: (client: Picker) => { }
});

type ClientPickerProviderProps = {
    children: ReactNode;
};

const ClientPickerProvider = ({ children }: ClientPickerProviderProps) => {
    const [client, setClient] = useState<Picker>(null);

    const getClients = async () => {
        try {
            const result = await axios.get<ClientModel[]>(config.clientstsUrl);
            const transformedData = result.data.map((client: ClientModel) => {
                return {
                    id: client._id,
                    title: client.fullName || '',
                };
            });
            setClient(transformedData[0] || null);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    return (
        <ClientContext.Provider value={{ client, setClient }}>
            {children}
        </ClientContext.Provider>
    );
};

export { ClientContext, ClientPickerProvider };
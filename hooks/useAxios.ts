import { useState } from 'react';
import axios, { AxiosResponse, Method } from 'axios';
import CredentialsModel from './../Models/CredentialsModel';

export type UseAxiosHookResponse<T> = {
    data: T | null;
    isLoading: boolean;
    error?: Error | null;
    sendRequest: (requestData: CredentialsModel | any, method: Method) => Promise<AxiosResponse<T>>;
};

type UseAxiosHookOptions = {
    apiUrl: string;
    method: string;
};
const useAxios = <T extends unknown>(options: UseAxiosHookOptions): UseAxiosHookResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const sendRequest = async (requestData: any, method: Method): Promise<AxiosResponse<T>> => {
        setIsLoading(true);
        try {
            const response = await axios.request<T>({
                url: options.apiUrl,
                method: method,
                data: requestData.credentials
            });
            setData(response.data);
            setIsLoading(false);
            setError(null);
            return response;
        } catch (error: any) {
            setError(error);
            setIsLoading(false);
            throw error;
        }

    };

    return { data, isLoading, error, sendRequest };
};

export default useAxios;



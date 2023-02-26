import { loginAction, logoutAction, registerAction } from "../redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import store from "../redux/Store";
import axios from "axios";




class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }




    public async login(credentials: CredentialsModel): Promise<string> {
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;
        if (token) {
            await AsyncStorage.setItem("token", token);
            store.dispatch(loginAction(token));
        }

        return token;

    }

    public async logout(): Promise<void> {
        store.dispatch(logoutAction());
        await AsyncStorage.removeItem("token");

    }

    public async isLoggedIn(): Promise<boolean> {
        const tokenState = store.getState().authState.token
        const tokenAsyncStorage = await AsyncStorage.getItem("token");
        if (tokenState === null && tokenAsyncStorage === null) {
            return false;
        }
        return true;
    }
}

const authService = new AuthService();

export default authService;


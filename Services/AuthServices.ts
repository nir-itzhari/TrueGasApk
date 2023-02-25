import { loginAction, logoutAction, registerAction } from "../redux/AuthState";
import store from "../redux/Store";
import config from "../Utils/Config";
import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import AsyncStorage from "@react-native-async-storage/async-storage";



class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    public login(token: string): string {
        // const response = await axios.post<string>(config.loginUrl, credentials);
        // const token = response.data;
        store.dispatch(loginAction(token));
        return token;
    }

    public logout(): void {
        store.dispatch(logoutAction());
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


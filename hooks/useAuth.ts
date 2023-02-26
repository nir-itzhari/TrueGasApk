import { useContext } from "react";
import { ToastAndroid } from "react-native";
import { AuthContextType, AuthContext } from "../navigation/AuthContext";



const useAuth = (): AuthContextType => {

    const context = useContext(AuthContext)

    if (!context) {
        ToastAndroid.show('useAuth must be within an AuthProvider', 3000);
    }

    return context

}

export default useAuth
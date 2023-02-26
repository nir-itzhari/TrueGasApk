import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";


const AuthStack = createNativeStackNavigator<AuthStackParamList>();


const AuthStackScreens = () => {
    return (
        <SafeAreaProvider>
            <AuthStack.Navigator>
                <AuthStack.Screen name="Login" component={LoginScreen} />
            </AuthStack.Navigator>
        </SafeAreaProvider>
    );
}

export default AuthStackScreens
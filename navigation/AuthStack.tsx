import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";


const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthStack = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default AuthStack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { AuthStackParamList } from "../types";


const AuthStack = createNativeStackNavigator<AuthStackParamList>();


const AuthStackScreens = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthStackScreens
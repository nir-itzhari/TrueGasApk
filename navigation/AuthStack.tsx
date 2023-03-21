import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";
import { useAppColorScheme } from "../hooks/useAppColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from 'react-native'

const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthStack = () => {
    const { appColorScheme } = useAppColorScheme();



    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    title: "כניסה", headerTitleAlign: "center", headerBackground: () => <LinearGradient style={styles.background} start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} colors={appColorScheme === 'light' ? ['rgba(253,187,45,0.8)', 'transparent'] : ['rgba(54,54,54,0.8)', 'transparent']} />

                }} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default AuthStack



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})
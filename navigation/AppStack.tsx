import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import BottomTabNav from "../components/BottomTabNav";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootTabParamList } from "../types";




const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
    const [isReady, setIsReady] = useState<boolean>(null);
    const [token, setToken] = useState<string>(null)


    // useEffect(() => {
    //   setIsReady(false);
    //   const getToken = async () => {
    //     try {
    //       const tokenFromStorage = await AsyncStorage.getItem('token');
    //       if (tokenFromStorage) {
    //         const decodedToken: any = jwtDecode(tokenFromStorage);
    //         store.getState().authState.user = decodedToken;
    //         setToken(tokenFromStorage)
    //       }
    //     } catch (error) {
    //       console.log("Invalid token:", error);
    //     } finally {
    //       setTimeout(() => {
    //         setIsReady(true);
    //         SplashScreen.hideAsync()
    //       }, 1000);
    //     }
    //   };
    //   getToken()
    // }, []);

    // if (!isReady) {
    //   return <ActivityIndicator size="large" style={styles.container} />
    // }


    return (
        // <Stack.Navigator initialRouteName={isReady && token !== null ? "Root" : "Login"}>
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default AppStack

// const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <>
            <BottomTabNav />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: 'space-around',
        padding: 10
    }
})
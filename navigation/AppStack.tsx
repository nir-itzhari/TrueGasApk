import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme, StyleSheet } from "react-native";
import { RootStackParamList } from "../types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNav from "../components/BottomTabNav";




const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {

    return (
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

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <BottomTabNav />
        </SafeAreaProvider>

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
import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, useColorScheme, View } from "react-native";
import AddAssignmentScreen from "../components/addAssignmentForm/AddAssignmentForm";
import { useAppColorScheme } from "../hooks/useAppColorScheme";
import AddClientScreenModal from "../screens/AddClientScreenModal";
import AssignmentsListScreen from "../screens/AssignmentsListScreen";
import { AssignmentsStackParamList, AssignmentsStackScreenProps } from "../types";
import AssignmentCardScreen from './../screens/AssignmentCardScreen';
import { StyleSheet } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";



export function AssignmentsStack() {
    const Stack = createNativeStackNavigator<AssignmentsStackParamList>();
    const { appColorScheme } = useAppColorScheme();



    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AssignmentsListScreen"
                component={AssignmentsListScreen}
                options={({ navigation }: AssignmentsStackScreenProps<'AssignmentsListScreen'>) => ({
                    headerShown: false,
                    // title: 'רשימת משימות',
                    // headerTitleAlign: 'center', // aligns the header title to the center
                    // headerRight: () => (
                    //     <Pressable
                    //         onPress={() => {
                    //             navigation.navigate('AddAssignmentScreen');
                    //         }}
                    //         style={({ pressed }) => ({
                    //             opacity: pressed ? 0.5 : 1,
                    //         })}>
                    //         <MaterialIcons style={{ marginRight: 16 }} name="add-task" size={24} color={appColorScheme === "dark" ? "white" : "black"} />
                    //     </Pressable>
                    // ),
                    // headerBackground: () => <LinearGradient style={styles.background}  start={{ x: 0, y: 1}}
                    // end={{x: 0, y: 0}} colors={appColorScheme === 'light' ? ['rgba(253,187,45,0.8)', 'transparent'] : ['rgba(54,54,54,0.8)', 'transparent'] } />
                })}
            />
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                <Stack.Screen name="AddClientScreenModal" component={AddClientScreenModal} options={{ headerShown: false }} />

                <Stack.Screen name="AssignmentCardScreen" component={AssignmentCardScreen} options={{
                    title: "פרטי משימה", headerTitleAlign: 'center', headerBackground: () => <LinearGradient style={styles.background} start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }} colors={appColorScheme === 'light' ? ['rgba(253,187,45,0.8)', 'transparent'] : ['rgba(54,54,54,0.8)', 'transparent']} />
                }} />
                <Stack.Screen name="AddAssignmentScreen" component={AddAssignmentScreen} options={{ headerShown: false }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}




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
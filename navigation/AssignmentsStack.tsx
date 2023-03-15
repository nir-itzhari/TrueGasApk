import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, useColorScheme, View } from "react-native";
import AddAssignmentScreen from "../components/addAssignmentForm/AddAssignmentForm";
import { useAppColorScheme } from "../hooks/useAppColorScheme";
import AddClientScreenModal from "../screens/AddClientScreenModal";
import AssignmentsListScreen from "../screens/AssignmentsListScreen";
import { AssignmentsStackParamList, AssignmentsStackScreenProps } from "../types";
import AssignmentCardScreen from './../screens/AssignmentCardScreen';




export function AssignmentsStack() {
    const Stack = createNativeStackNavigator<AssignmentsStackParamList>();
    const { appColorScheme } = useAppColorScheme();



    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AssignmentsListScreen"
                component={AssignmentsListScreen}
                options={({ navigation }: AssignmentsStackScreenProps<'AssignmentsListScreen'>) => ({
                    title: 'רשימת משימות',
                    headerTitleAlign: 'center', // aligns the header title to the center
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('AddAssignmentScreen');
                            }}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialIcons style={{ marginRight: 16 }} name="add-task" size={24} color={appColorScheme === "dark" ? "white" : "black"} />
                        </Pressable>
                    ),
                    headerBackground: () => <View style={{ backgroundColor: appColorScheme === "dark" ? "#001" : "#ccc", width: "100%", height: "100%" }}></View>
                })}
            />
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                <Stack.Screen name="AddClientScreenModal" component={AddClientScreenModal} options={{
                    title: "הוסף לקוח", headerTitleAlign: 'center', headerBackground: () => <View style={{ backgroundColor: appColorScheme === "dark" ? "#001" : "#ccc", width: "100%", height: "100%" }}></View>
                }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                <Stack.Screen name="AssignmentCardScreen" component={AssignmentCardScreen} options={{
                    title: "פרטי משימה", headerTitleAlign: 'center', headerBackground: () => <View style={{ backgroundColor: appColorScheme === "dark" ? "#001" : "#ccc", width: "100%", height: "100%" }}></View>
                }} />
            </Stack.Group>
            <Stack.Screen name="AddAssignmentScreen" component={AddAssignmentScreen} options={{
                headerBackground: () => <View style={{ backgroundColor: appColorScheme === "dark" ? "#001" : "#ccc", width: "100%", height: "100%" }}></View>
            }} />
        </Stack.Navigator>
    )
}
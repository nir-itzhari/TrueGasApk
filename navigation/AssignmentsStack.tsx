import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import AddAssignmentScreen from "../components/addAssignmentForm/AddAssignmentForm";
import AddClientScreenModal from "../screens/AddClientScreenModal";
import AssignmentsListScreen from "../screens/AssignmentsListScreen";
import { AssignmentsStackParamList, AssignmentsStackScreenProps } from "../types";
import AssignmentCardScreen from './../screens/AssignmentCardScreen';




export function AssignmentsStack() {
    const Stack = createNativeStackNavigator<AssignmentsStackParamList>();

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
                            <MaterialIcons style={{ marginRight: 16 }} name="add-task" size={24} color="black" />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                <Stack.Screen name="AddClientScreenModal" component={AddClientScreenModal} options={{ title: "הוסף לקוח", headerTitleAlign: 'center' }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
                <Stack.Screen name="AssignmentCardScreen" component={AssignmentCardScreen} options={{ title: "פרטי משימה", headerTitleAlign: 'center' }} />
            </Stack.Group>
            <Stack.Screen name="AddAssignmentScreen" component={AddAssignmentScreen} />
        </Stack.Navigator>
    )
}
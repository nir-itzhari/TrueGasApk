import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RootTabParamList, RootTabScreenProps, AssignmentsStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import Colors from '../constants/Colors';
import React from 'react';
import { Pressable, ToastAndroid, View, StyleSheet } from 'react-native';
import AssignmentsListScreen from '../screens/AssignmentsListScreen';
import useAuth from '../hooks/useAuth';
import AddAssignmentScreen from './addAssignmentForm/AddAssignmentForm';
import { AssignmentsStack } from './../navigation/AssignmentsStack';
import { Text } from 'react-native-paper';
import { useAppColorScheme } from '../hooks/useAppColorScheme';
import useColorScheme from '../hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { appColorScheme } = useAppColorScheme();
  const { logout, user_id } = useAuth();


  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'בית',
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                logout();
                ToastAndroid.show("להתראות!", 3000);
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={[{ fontWeight: "bold", color: appColorScheme === "dark" ? "white" : "black" }]}>יציאה</Text>
                <MaterialIcons style={{ marginRight: 16, marginLeft: 5 }} name="logout" size={24} color={appColorScheme === "dark" ? "white" : "black"} />
              </View>
            </Pressable>
          ),
          headerBackground: () => <LinearGradient style={styles.background} start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} colors={appColorScheme === 'light' ? ['rgba(253,187,45,0.8)', 'transparent'] : ['rgba(54,54,54,0.8)', 'transparent']} />
          // <View style={{backgroundColor: appColorScheme === "dark" ? "#001" : "#ccc", width:"100%", height:"100%"}}></View>

        })}
      />
      <BottomTab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          headerTitleAlign: "center",
          title: 'דוחות',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                logout();
                ToastAndroid.show("להתראות!", 3000);
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={[{ fontWeight: "bold", color: appColorScheme === "dark" ? "white" : "black" }]}>יציאה</Text>
                <MaterialIcons style={{ marginRight: 16, marginLeft: 5 }} name="logout" size={24} color={appColorScheme === "dark" ? "white" : "black"} />
              </View>
            </Pressable>
          ),
          headerBackground: () => <LinearGradient style={styles.background} start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} colors={appColorScheme === 'light' ? ['rgba(253,187,45,0.8)', 'transparent'] : ['rgba(54,54,54,0.8)', 'transparent']} />
        }}
      />
      <BottomTab.Screen
        name="Assignments"
        component={AssignmentsStack}
        options={({ navigation }: RootTabScreenProps<'Assignments'>) => ({

          title: 'משימות',
          headerTitleAlign: "center",
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => {
          //       navigation.navigate("AddAssignmentScreen");
          //     }}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <MaterialIcons style={{ marginRight: 16 }} name="add-task" size={24} color={appColorScheme === "dark" ? "white" : "black"} />
          //   </Pressable>
          // ),
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => {
                logout();
                ToastAndroid.show("להתראות!", 3000);
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={[{ fontWeight: "bold", color: appColorScheme === "dark" ? "white" : "black" }]}>יציאה</Text>
                <MaterialIcons style={{ marginRight: 16, marginLeft: 5 }} name="logout" size={24} color={appColorScheme === "dark" ? "white" : "black"} />
              </View>
            </Pressable>
          ),
          headerBackground: () => <LinearGradient style={styles.background} start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} colors={appColorScheme === 'light' ? ['rgba(253,187,45,0.8)', 'transparent'] : ['rgba(54,54,54,0.8)', 'transparent']} />

        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
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
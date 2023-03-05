import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RootTabParamList, RootTabScreenProps, AssignmentsStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import React from 'react';
import { Pressable, ToastAndroid, View } from 'react-native';
import AssignmentsListScreen from '../screens/AssignmentsListScreen';
import useAuth from '../hooks/useAuth';
import AddAssignmentScreen from './addAssignmentForm/AddAssignmentForm';
import { AssignmentsStack } from './../navigation/AssignmentsStack';
import { Text } from 'react-native-paper';

const BottomTab = createBottomTabNavigator<RootTabParamList>();


export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
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
                // navigation.navigate('Modal');
                logout();
                ToastAndroid.show("להתראות!", 3000);
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>יציאה</Text>
                <MaterialIcons style={{ marginRight: 16, marginLeft: 5 }} name="logout" size={24} color="black" />
              </View>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          headerTitleAlign: "center",
          title: 'דוחות',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Assignments"
        component={AssignmentsStack}
        options={{
          title: 'משימות',
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
        }}
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
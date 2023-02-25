import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, ColorSchemeName, StyleSheet } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from './../screens/LoginScreen';
import store from './../redux/Store';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import BottomTabNav from '../components/BottomTabNav';
import { AuthContext, AuthProvider } from './AuthContext';
import { View } from '../components/Themed';
import AppStack from './AppStack';
import AuthStackScreens from './AuthStack';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { isLoading, token } = useContext(AuthContext)

  console.log(isLoading, token)
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.horizontal} />
      </View>
    )
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      {token !== null ? <AppStack /> : <AuthStackScreens />}

    </NavigationContainer>
  );
}

// const Stack = createNativeStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   const [isReady, setIsReady] = useState<boolean>(null);
//   const [token, setToken] = useState<string>(null)


//   // useEffect(() => {
//   //   setIsReady(false);
//   //   const getToken = async () => {
//   //     try {
//   //       const tokenFromStorage = await AsyncStorage.getItem('token');
//   //       if (tokenFromStorage) {
//   //         const decodedToken: any = jwtDecode(tokenFromStorage);
//   //         store.getState().authState.user = decodedToken;
//   //         setToken(tokenFromStorage)
//   //       }
//   //     } catch (error) {
//   //       console.log("Invalid token:", error);
//   //     } finally {
//   //       setTimeout(() => {
//   //         setIsReady(true);
//   //         SplashScreen.hideAsync()
//   //       }, 1000);
//   //     }
//   //   };
//   //   getToken()
//   // }, []);

//   // if (!isReady) {
//   //   return <ActivityIndicator size="large" style={styles.container} />
//   // }


//   return (
//     // <Stack.Navigator initialRouteName={isReady && token !== null ? "Root" : "Login"}>
//     <Stack.Navigator>
//       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
//       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
//       <Stack.Group screenOptions={{ presentation: 'modal' }}>
//         <Stack.Screen name="Modal" component={ModalScreen} />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// }


// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <>
//       <BottomTabNav />
//     </>
//   );
// }


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
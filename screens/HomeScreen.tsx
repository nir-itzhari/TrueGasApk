import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Button, ToastAndroid } from 'react-native';
import { Text, View } from '../components/Themed';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from './../Services/AuthServices';
import store from './../redux/Store';
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootTabScreenProps } from '../types';
import { AuthContext } from '../navigation/AuthContext';
import useAuth from './../hooks/useAuth';





export default function HomeScreen({ navigation, route }: RootTabScreenProps<'Home'>) {
  const navigationRef = createNavigationContainerRef()
  const user_id = route.params?.user_id
  const [token, setToken] = useState<string>(null);

  const handlePress = async (): Promise<void> => {
    const tokenFromStorage = await AsyncStorage.getItem("token");
    setToken(tokenFromStorage);
  };

  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {user_id && <Text style={styles.title}>Welcome {user_id}</Text>}
      <Button title='התנתק' onPress={() => {
        logout()
        ToastAndroid.show("להתראות!", 3000);

      }} />

      {token !== null && <Text style={styles.title}>{token}</Text>}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  greet: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

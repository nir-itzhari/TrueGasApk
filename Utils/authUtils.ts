import AsyncStorage from '@react-native-async-storage/async-storage';

export async function checkToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}
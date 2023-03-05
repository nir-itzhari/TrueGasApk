import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ActivityIndicator, ColorSchemeName, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import LinkingConfiguration from './LinkingConfiguration';
import AppStack from './AppStack';
import useAuth from './../hooks/useAuth';
import AuthStack from './AuthStack';
import { ClientPickerProvider } from './ClientPickerContext';
// import { UserPickerProvider } from './UserPickerContext';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { isLoading, token } = useAuth()
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.horizontal} />
      </View>
    )
  } else {

    return (
      <ClientPickerProvider>
        {/* <UserPickerProvider> */}
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

          {token !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
        {/* </UserPickerProvider> */}
      </ClientPickerProvider>
    );
  }
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
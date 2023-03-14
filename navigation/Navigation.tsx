import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ActivityIndicator, ColorSchemeName, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import LinkingConfiguration from './LinkingConfiguration';
import AppStack from './AppStack';
import useAuth from './../hooks/useAuth';
import AuthStack from './AuthStack';
import ApiContextProvider from '../hooks/useApi';
import { useAppColorScheme } from '../hooks/useAppColorScheme';



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { appColorScheme } = useAppColorScheme();

  const { isLoading, token } = useAuth()
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" style={styles.horizontal} />
      </View>
    )
  } else {

    return (
      <ApiContextProvider>
        {/* <ClientPickerProvider> */}
          <NavigationContainer
            linking={LinkingConfiguration}
            theme={appColorScheme === 'dark' ? DarkTheme : DefaultTheme}>

            {token !== null ?  <AppStack /> : <AuthStack />}

          </NavigationContainer>
        {/* </ClientPickerProvider> */}
      </ApiContextProvider>
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
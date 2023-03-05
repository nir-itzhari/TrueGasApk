import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './navigation/AuthContext';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';
import store from './redux/Store';
import KeyboardAvoidingWrapper from './navigation/AKeyboard';
import 'react-native-gesture-handler';



const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();



  if (!isLoadingComplete) {
    return null;

  }
  else {

    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthProvider>
            <KeyboardAvoidingWrapper>
              {/* <ClientPickerProvider> */}
              {/* <UserPickerProvider> */}
              <Navigation colorScheme={colorScheme} />
              <StatusBar style='auto' />
              {/* </UserPickerProvider> */}
              {/* </ClientPickerProvider> */}
            </KeyboardAvoidingWrapper>
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
export default App


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
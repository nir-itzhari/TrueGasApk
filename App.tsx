import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './navigation/AuthContext';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';
import store from './redux/Store';
import 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform } from 'react-native';

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0; // adjust the value based on your design


  if (!isLoadingComplete) {
    return null;

  }
  else {

    return (
      // <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
          <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, flexDirection: "column" }}
          >
            {/* <ClientPickerProvider> */}
            {/* <UserPickerProvider> */}
            <Navigation colorScheme={colorScheme} />
            {/* <StatusBar style='auto' /> */}
            {/* </UserPickerProvider> */}
            {/* </ClientPickerProvider> */}
          </KeyboardAvoidingView>
        </AuthProvider>
      </Provider>
      // </SafeAreaProvider>
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
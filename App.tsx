import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import store from './redux/Store';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import { AuthProvider } from './navigation/AuthContext';




const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();



  if (!isLoadingComplete) {
    return null;
  } else {


    return (
      <SafeAreaProvider>
        <AuthProvider>
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
export default App
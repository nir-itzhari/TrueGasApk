import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './navigation/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';
import store from './redux/Store';
import 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform, View, ColorSchemeName, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Switch } from 'react-native-paper';
import { AppColorSchemeContext } from './hooks/useAppColorScheme';
import Icon from 'react-native-vector-icons/FontAwesome';

// const App: React.FC = () => {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();
//   const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0; // adjust the value based on your design
//   const [appColorScheme, setAppColorScheme] = useState<ColorSchemeName>(colorScheme)
//   const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

//   const onToggleSwitch = () => {

//     setIsSwitchOn(!isSwitchOn);

//     if (appColorScheme === 'dark') {
//       return setAppColorScheme('light')
//     }
//     setAppColorScheme('dark')
//   }




//   if (!isLoadingComplete) {
//     return null;

//   }
//   else {

//     return (
//       // <SafeAreaProvider>
//       <Provider store={store}>
//         <AuthProvider>
//           <KeyboardAvoidingView
//             keyboardVerticalOffset={keyboardVerticalOffset}
//             behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             style={{ flex: 1, flexDirection: "column" }}
//           >
//             {/* <ClientPickerProvider> */}
//             {/* <UserPickerProvider> */}
//             <Navigation colorScheme={isSwitchOn ? colorScheme : appColorScheme} />
//             <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
//             {/* <StatusBar style='auto' /> */}
//             {/* </UserPickerProvider> */}
//             {/* </ClientPickerProvider> */}
//           </KeyboardAvoidingView>
//         </AuthProvider>
//       </Provider>
//       // </SafeAreaProvider>
//     );
//   }
// }
// export default App


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   horizontal: {
//     flexDirection: "row",
//     justifyContent: 'space-around',
//     padding: 10
//   }
// })




const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0;
  const [appColorScheme, setAppColorScheme] = useState<ColorSchemeName>(colorScheme);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);



  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (appColorScheme === 'light') {
      return setAppColorScheme('dark');
    }
    setAppColorScheme('light');
  }




  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, flexDirection: 'column' }}
        >
          <AppColorSchemeContext.Provider value={{ appColorScheme, setAppColorScheme }}>
            <Navigation colorScheme={isSwitchOn ? colorScheme : appColorScheme} />
            <View style={{...styles.switchContainer, shadowColor: appColorScheme === 'light' ? '#000' : 'white',}}>
  <View style={[styles.iconContainer, { backgroundColor: appColorScheme === 'light' ? 'gray' : '#ccc', borderColor: appColorScheme === 'light' ? 'black' : 'white' }]}>
    <Icon name="sun-o" style={styles.icon} color={appColorScheme === 'light' ? 'yellow' : 'black'} />
  </View>
  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
  <View style={[styles.iconContainer, { backgroundColor: appColorScheme === 'light' ? '#ccc' : 'black', borderColor: appColorScheme === 'light' ? 'gray' : 'black' }]}>
    <Icon name="moon-o" style={styles.icon} color={appColorScheme === 'light' ? 'black' : 'white'} />
  </View>
</View>
          </AppColorSchemeContext.Provider>
        </KeyboardAvoidingView>
      </AuthProvider>
    </Provider>
  );
};

export default App
const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 35,
    left: -4,
    // backgroundColor: '#F8F8F8',
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    borderColor: '#E2E2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
  },
});
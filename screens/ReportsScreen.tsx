import { RootTabScreenProps } from '../types';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';



export default function ReportsScreen({ navigation }: RootTabScreenProps<'Reports'>) {



  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>דוחות</Text>
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
});

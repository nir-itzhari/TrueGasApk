import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useAuth from './../hooks/useAuth';
import { Text } from 'react-native';
import { useAppColorScheme } from '../hooks/useAppColorScheme';





export default function HomeScreen({ navigation, route }: RootTabScreenProps<'Home'>) {
  const { user_id } = useAuth();
  const { appColorScheme } = useAppColorScheme();

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: appColorScheme === "dark" ? "white" : "black" }}>בית</Text>
      <View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {user_id && <Text style={styles.title}>Welcome {user_id}</Text>}
      </View>
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

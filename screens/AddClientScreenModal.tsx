import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AddClientForm from '../components/addClient/AddClientComponent';
import { AssignmentsStackScreenProps } from '../types';
import { Animated, Easing } from 'react-native';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { useAppColorScheme } from '../hooks/useAppColorScheme';

export default function AddClientScreenModal({ route, navigation }: AssignmentsStackScreenProps<"AddClientScreenModal">) {
  const [animation] = useState(new Animated.Value(0));
  const { appColorScheme } = useAppColorScheme();


  const handlePress = () => {
    navigation.goBack()
  }


  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <Animated.View style={{
      flex: 1,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [500, 0],
          }),
        },
      ],
    }}>

      <View>
        <AddClientForm handlePress={handlePress} />
      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  form: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    marginVertical: 8,
    borderColor: '#cccccc',
    fontSize: 16,
  },
  button: {
    marginVertical: 16,
    backgroundColor: '#0077cc',
    borderRadius: 4,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 14,
    marginTop: 4,
  },
});
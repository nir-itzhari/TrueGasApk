import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AddClientForm from '../components/addClient/AddClientComponent';
import { AssignmentsStackScreenProps } from '../types';

export default function AddClientScreenModal() {


  return (
      <View style={styles.form}>
        <AddClientForm />
      </View>
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
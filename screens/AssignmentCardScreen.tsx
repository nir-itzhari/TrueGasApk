import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import AssignmentModel from './../Models/AssignmentModel';
import axios from 'axios';
import config from './../Utils/Config';

export default function AssignmentCardScreen({ route, navigation }: RootTabScreenProps<"AssignmentCardScreen">) {
  const [assignment, setAssignment] = useState<AssignmentModel>()


  const routeParam = route.params

  const getAssignment = async () => {
    try {
      const result = await axios.get<AssignmentModel>(config.assignmentsUrl + routeParam.assignmentId)
      const assignmentFromServer = result.data
      if (assignmentFromServer) {
        setAssignment(assignmentFromServer)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAssignment()
  }, [])


  return (
    <View style={styles.form}>
      <Text>{routeParam.assignmentId}</Text>
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
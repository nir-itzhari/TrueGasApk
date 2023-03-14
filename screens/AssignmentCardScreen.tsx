import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import AssignmentModel from './../Models/AssignmentModel';
import axios from 'axios';
import config from './../Utils/Config';
import { useAppColorScheme } from '../hooks/useAppColorScheme';

export default function AssignmentCardScreen({ route, navigation }: RootTabScreenProps<"AssignmentCardScreen">) {
  const [assignment, setAssignment] = useState<AssignmentModel>()
  const { appColorScheme } = useAppColorScheme();


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
    <View style={{ ...styles.form, shadowColor: appColorScheme === "dark" ? 'white' : "#000000", backgroundColor: appColorScheme === "dark" ? "black" : "white" }}>
      <Text style={{ color: appColorScheme === "dark" ? "white" : "black" }}>{routeParam.assignmentId}</Text>
    </View >
  );
};


const styles = StyleSheet.create({
  form: {
    padding: 16,
    borderRadius: 8,
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
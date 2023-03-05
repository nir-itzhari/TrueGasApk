import { AssignmentsStackScreenProps, RootTabScreenProps } from '../types';
import { View, StyleSheet, Text, Button } from 'react-native';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AssignmentsFlatList from '../components/assignmentsFlatList/assignmentsFlatList';
import { Provider } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import store from './../redux/Store';
import AssignmentsPagnition from '../components/assignmentsFlatList/AssignmentsPagnition';
import { DataPagnition } from '../components/assignmentsFlatList/DataPagnition';
import { Divider } from 'react-native-paper';



export default function AssignmentsListScreen({ navigation }: AssignmentsStackScreenProps<'AssignmentsListScreen'>) {

    return (

        <View style={styles.container}>
            <DataPagnition />
            <Divider />
            <AssignmentsPagnition />
            {/* <AssignmentsFlatList /> */}
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16,
        // paddingVertical: 20,
    },
});
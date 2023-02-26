import { RootTabScreenProps } from '../types';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import AssignmentsFlatList from '../components/assignmentsFlatList/assignmentsFlatList';




export default function AssignmentsScreen({ navigation }: RootTabScreenProps<'Assignments'>) {

    


    return (
        <View style={styles.container}>
            <AssignmentsFlatList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
});
import { RootTabScreenProps } from '../types';
import { View, StyleSheet } from 'react-native';
import TasksFlatList from '../components/taskFlatList/tasksFlatList';
import React from 'react';




export default function TaskScreen({ navigation }: RootTabScreenProps<'Tasks'>) {

    return (
        <View style={styles.container}>
            <TasksFlatList />
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
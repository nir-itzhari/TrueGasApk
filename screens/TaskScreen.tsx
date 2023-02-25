import React from 'react';
import { View, StyleSheet } from 'react-native';
import TasksFlatList from '../components/taskFlatList/tasksFlatList';
import { RootTabScreenProps } from '../types';




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
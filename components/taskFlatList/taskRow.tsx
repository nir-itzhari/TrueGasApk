import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from './tasksFlatList';

interface TaskRowProps {
    task: Task;
    index: number
}

export default function TaskRow({ task, index }: TaskRowProps) {
    return (
        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
            <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{moment(task.date).format("DD/MM/YYYY").toLocaleString()}</Text>
            <Text style={styles.columnRowTxt}>{task.title}</Text>
            <Text style={styles.columnRowTxt}>{task.isDone ? 'בוצע' : 'לא בוצע'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
    },
    columnRowTxt: {
        width: "33.5%",
        textAlign: "center",
        fontSize: 14,
    }
});
import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AssignmetnModel from '../../Models/AssignmentModel';

interface AssignmentRowProps {
    assignment: AssignmetnModel;
    index: number
}

export default function AssignmentRow({ assignment, index }: AssignmentRowProps) {
    return (
        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
            <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{moment(assignment.date).format("DD/MM/YYYY").toLocaleString()}</Text>
            <Text style={styles.columnRowTxt}>{assignment.title}</Text>
            <Text style={styles.columnRowTxt}>{assignment.isDone ? 'בוצע' : 'לא בוצע'}</Text>
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
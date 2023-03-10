import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AssignmentModel from '../../Models/AssignmentModel';
// import { Assignment } from '../CustomDatePicker/AssignmentsTable';

interface AssignmentRowProps {
    assignment: AssignmentModel;
    index: number;
    handlePress: (assignmentId: string) => void;
}

export default function AssignmentRow({ assignment, index, handlePress, }: AssignmentRowProps) {



    const handleRowPress = () => {
        handlePress(assignment.assignmentId);
    };

    return (
        <View
            style={{
                ...styles.tableRow,
                backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white',
            }}
        >
            <Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>
                {moment(assignment.date).format('DD/MM/YYYY').toLocaleString()}
            </Text>
            <Text style={styles.columnRowTxt}>{assignment.title}</Text>
            <Text style={styles.columnRowTxt}>
                {assignment.isDone ? 'בוצע' : 'לא בוצע'}
            </Text>
            <TouchableOpacity style={styles.rowButton} onPress={handleRowPress}>
                <Text style={styles.rowButtonText}>{'<'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    columnRowTxt: {
        width: '25%',
        textAlign: 'center',
        fontSize: 14,
    },
    rowButton: {
        width: 50,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#37C2D0',
        marginLeft: 25,
        borderRadius: 10
    },
    rowButtonText: {
        fontSize: 14,
        fontWeight: '900',
        color: 'black',
    },
    actionColumnHeader: {
        width: 20,
    },
});
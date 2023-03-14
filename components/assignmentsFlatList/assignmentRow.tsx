import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useAppColorScheme } from '../../hooks/useAppColorScheme';
import AssignmentModel from '../../Models/AssignmentModel';
// import { Assignment } from '../CustomDatePicker/AssignmentsTable';

interface AssignmentRowProps {
    assignment: AssignmentModel;
    index: number;
    handlePress: (assignmentId: string) => void;
}

export default function AssignmentRow({ assignment, index, handlePress, }: AssignmentRowProps) {
    const { appColorScheme } = useAppColorScheme();



    const handleRowPress = () => {
        handlePress(assignment.assignmentId);
    };

    return (
        <View
            style={{ ...styles.tableRow, backgroundColor: appColorScheme === "dark" ? "black" : '#F0FBFC' }}
        >
            <Text style={[appColorScheme === "dark" ? styles.columnRowTxt : styles.columnRowTxtDark, { fontWeight: "bold" }]}>
                {moment(assignment.date).format('DD/MM/YYYY').toLocaleString()}
            </Text>
            <Text style={[appColorScheme === "dark" ? styles.columnRowTxt : styles.columnRowTxtDark]}>{assignment.title}</Text>
            <Text style={[appColorScheme === "dark" ? styles.columnRowTxt : styles.columnRowTxtDark]}>
                {assignment.isDone ? 'בוצע' : 'לא בוצע'}
            </Text>
            <TouchableOpacity style={[appColorScheme === "dark" ? styles.rowButtonDark : styles.rowButton]} onPress={handleRowPress}>
                <Text style={[appColorScheme === "dark" ? styles.rowButtonTextDark : styles.rowButtonText]}>{'<'}</Text>
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
        color: "white"
    },
    columnRowTxtDark: {
        width: '25%',
        textAlign: 'center',
        fontSize: 14,
        color: "black"

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
    rowButtonDark: {
        width: 50,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'royalblue',
        marginLeft: 25,
        borderRadius: 10
    },
    rowButtonText: {
        fontSize: 14,
        fontWeight: '900',
        color: 'black',
    },
    rowButtonTextDark: {
        fontSize: 14,
        fontWeight: '900',
        color: 'white',
    },
    actionColumnHeader: {
        width: 20,
    },
});
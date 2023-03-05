import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import AssignmentModel from '../../Models/AssignmentModel';
import AssignmentRow from './assignmentRow';

export interface Assignment {
    assignmentId: string;
    date: Date;
    title: string;
    description: string;
    client_id: string | null
    user_id: string | null;
    imageFile: FileList;
    imageName: string | null;
    isDone?: boolean;

}

export default function AssignmentsFlatList() {
    const dataArray: Assignment[] = [
        { assignmentId: "1", date: new Date(2022, 1, 1), title: 'משימה 1', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
        { assignmentId: "2", date: new Date(2022, 1, 2), title: 'משימה 2', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
        { assignmentId: "3", date: new Date(2022, 1, 11), title: 'משימה 3', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
        { assignmentId: "4", date: new Date(2022, 1, 15), title: 'משימה 4', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
        { assignmentId: "5", date: new Date(2022, 1, 24), title: 'משימה 5', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
        { assignmentId: "6", date: new Date(2022, 1, 13), title: 'משימה 6', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
        { assignmentId: "7", date: new Date(2022, 1, 16), title: 'משימה 7', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    ];

    const [sortedArray, setSortedArray] = useState<AssignmentModel[]>(dataArray.sort((a, b) => moment(a.date).diff(moment(b.date))));
    const [sortColumn, setSortColumn] = useState<keyof AssignmentModel>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortArray = (prop: keyof AssignmentModel) => {
        let sorted = [...sortedArray];
        if (prop === sortColumn) {
            sorted.reverse();
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            sorted.sort((a: AssignmentModel, b: AssignmentModel) => {
                if (a[prop] < b[prop]) return sortDirection === 'asc' ? -1 : 1;
                if (a[prop] > b[prop]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
            setSortColumn(prop);
            setSortDirection('asc');
        }
        setSortedArray(sorted);
    };

    const renderItem = ({ item, index }: { item: AssignmentModel, index: number }) => (
        <AssignmentRow assignment={item} index={index} />
    );

    const renderColumnHeader = (column: keyof AssignmentModel, title: string) => {
        const isActive = column === sortColumn;
        const direction = isActive ? sortDirection : 'asc';
        const icon = (
            <MaterialCommunityIcons
                name={direction === 'desc' ? 'arrow-up-drop-circle' : 'arrow-down-drop-circle'}
            />
        );
        return (
            <TouchableOpacity
                style={styles.columnHeader}
                onPress={() => sortArray(column)}
            >
                <Text style={styles.columnHeaderTxt}>{title}</Text>
                {isActive && icon}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tableHeader}>
                {renderColumnHeader('date', 'תאריך')}
                {renderColumnHeader('title', 'סוג')}
                {renderColumnHeader('isDone', 'סטטוס')}
            </View>
            <FlatList
                data={sortedArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#37C2D0",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50
    },
    columnHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnHeaderTxt: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 4,
    },
    columnRowTxt: {
        flex: 1,
        textAlign: 'center',
    },
});
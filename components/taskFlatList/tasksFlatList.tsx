import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import TaskRow from './taskRow';

export interface Task {
    date: Date;
    title: string;
    isDone: boolean;
}

export default function TasksFlatList() {
    const dataArray: Task[] = [
        { date: new Date(2022, 1, 1), title: 'משימה 1', isDone: false },
        { date: new Date(2022, 1, 27), title: 'משימה 2', isDone: true },
        { date: new Date(2022, 1, 2), title: 'משימה 3', isDone: false },
        { date: new Date(2022, 1, 5), title: 'משימה 4', isDone: false },
        { date: new Date(2022, 1, 11), title: 'משימה 5', isDone: true },
        { date: new Date(2022, 1, 22), title: 'משימה 6', isDone: false },
        { date: new Date(2022, 1, 13), title: 'משימה 7', isDone: false },
        { date: new Date(2022, 1, 16), title: 'משימה 8', isDone: true },
        { date: new Date(2022, 1, 7), title: 'משימה 9', isDone: false }
    ];

    const [sortedArray, setSortedArray] = useState<Task[]>(dataArray.sort((a, b) => moment(a.date).diff(moment(b.date))));
    const [sortColumn, setSortColumn] = useState<keyof Task>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortArray = (prop: keyof Task) => {
        let sorted = [...sortedArray];
        if (prop === sortColumn) {
            sorted.reverse();
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            sorted.sort((a: Task, b: Task) => {
                if (a[prop] < b[prop]) return sortDirection === 'asc' ? -1 : 1;
                if (a[prop] > b[prop]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
            setSortColumn(prop);
            setSortDirection('asc');
        }
        setSortedArray(sorted);
    };

    const renderItem = ({ item, index }: { item: Task, index: number }) => (
        <TaskRow task={item} index={index} />
    );

    const renderColumnHeader = (column: keyof Task, title: string) => {
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
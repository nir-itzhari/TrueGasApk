import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import AssignmentModel from '../../Models/AssignmentModel';
import AssignmentRow from '../assignmentsFlatList/assignmentRow';
import { AssignmentsStackParamList, RootTabScreenProps } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useAppColorScheme } from '../../hooks/useAppColorScheme';

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
    action: () => void
}

interface Props {
    navigation: NativeStackNavigationProp<AssignmentsStackParamList, "AssignmentsListScreen", undefined>
    data: Assignment[]
}

export default function AssignmentsTable({ data, navigation }: Props) {
    const { appColorScheme } = useAppColorScheme();

    
    // const dataArray: Assignment[] = [
    //     { assignmentId: "1", date: new Date(2022, 1, 1), title: 'משימה 1', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
    //     { assignmentId: "2", date: new Date(2022, 1, 2), title: 'משימה 2', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true, action: () => { } },
    //     { assignmentId: "3", date: new Date(2022, 1, 11), title: 'משימה 3', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
    //     { assignmentId: "4", date: new Date(2022, 1, 15), title: 'משימה 4', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
    //     { assignmentId: "5", date: new Date(2022, 1, 24), title: 'משימה 5', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
    //     { assignmentId: "6", date: new Date(2022, 1, 13), title: 'משימה 6', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true, action: () => { } },
    //     { assignmentId: "7", date: new Date(2022, 1, 16), title: 'משימה 7', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true, action: () => { } },
    // ];

    const [sortedArray, setSortedArray] = useState<Assignment[]>(data.sort((a, b) => moment(a.date).diff(moment(b.date))));
    const [sortColumn, setSortColumn] = useState<keyof Assignment>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortArray = (prop: keyof AssignmentModel) => {
        let sorted = [...sortedArray];
        if (prop === sortColumn) {
            sorted.reverse();
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            sorted.sort((a: Assignment, b: Assignment) => {
                if (a[prop] < b[prop]) return sortDirection === 'asc' ? -1 : 1;
                if (a[prop] > b[prop]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
            setSortColumn(prop);
            setSortDirection('asc');
        }
        setSortedArray(sorted);
    };

    const handlePressRow = (assignmentId: string) => {
        console.log(assignmentId)
        navigation.navigate("AssignmentCardScreen", { assignmentId })

    }

    const renderItem = ({ item, index }: { item: Assignment, index: number }) => (
        <AssignmentRow assignment={item} index={index} handlePress={handlePressRow} />
    );

    const renderColumnHeader = (column: keyof Assignment, title: string) => {
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
                onPress={() => {
                    if (column !== "action") {
                        sortArray(column)
                    }
                }
                }>
                <Text style={styles.columnHeaderTxt}>{title}</Text>
                {isActive && icon}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={appColorScheme === "dark" ? styles.tableHeaderDark : styles.tableHeader}>
                {renderColumnHeader('date', 'תאריך')}
                {renderColumnHeader('title', 'סוג')}
                {renderColumnHeader('isDone', 'סטטוס')}
                {renderColumnHeader('action', 'הצג')}
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
        flexDirection: "column",
        justifyContent: "center",
        // marginTop: 20,
        // marginHorizontal: 10,
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
    tableHeaderDark: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "royalblue",
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
        color: "white",
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
import { AssignmentsStackScreenProps, RootTabScreenProps } from '../types';
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import AssignmentsFlatList from '../components/assignmentsFlatList/assignmentsFlatList';
import { Provider } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import store from './../redux/Store';
import AssignmentsPagnition from '../components/assignmentsFlatList/AssignmentsPagnition';
import { DataPagnition } from '../components/assignmentsFlatList/DataPagnition';
import { Divider } from 'react-native-paper';
import AssignmentModel from './../Models/AssignmentModel';
import axios from 'axios';
import config from './../Utils/Config';
import AssignmentsTable from '../components/assignmentsFlatList/AssignmentsTable';

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




export default function AssignmentsListScreen({ navigation }: AssignmentsStackScreenProps<'AssignmentsListScreen'>) {
    const [assignments, setAssignments] = useState<AssignmentModel[]>(null)
    const dataArray: Assignment[] = [
        { assignmentId: "1", date: new Date(2022, 1, 1), title: 'משימה 1', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
        { assignmentId: "2", date: new Date(2022, 1, 2), title: 'משימה 2', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true, action: () => { } },
        { assignmentId: "3", date: new Date(2022, 1, 11), title: 'משימה 3', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
        { assignmentId: "4", date: new Date(2022, 1, 15), title: 'משימה 4', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
        { assignmentId: "5", date: new Date(2022, 1, 24), title: 'משימה 5', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false, action: () => { } },
        { assignmentId: "6", date: new Date(2022, 1, 13), title: 'משימה 6', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true, action: () => { } },
        { assignmentId: "7", date: new Date(2022, 1, 16), title: 'משימה 7', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true, action: () => { } },
    ];

    const handleDatePress = (date: string) => {
        console.log(date)
    }


    const getAssignments = async (): Promise<void> => {

        try {
            // const result = await axios.get<AssignmentModel[]>(config.assignmentsUrl)

            setAssignments(dataArray)
            console.log(assignments)


        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        getAssignments()
    }, [])



    return (
        <View style={styles.container}>
            <DataPagnition handleDatePressed={handleDatePress} />
            {/* <Divider /> */}
            <View style={{ borderWidth: 1, borderRadius: 8, borderColor: "#ccc", width: "85%", margin: 10, marginHorizontal: 30, opacity: 0.7 }}></View>
            <AssignmentsTable data={dataArray} navigation={navigation} />
            {/* <AssignmentsPagnition data={dataArray} /> */}
            {/* <AssignmentsFlatList /> */}
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
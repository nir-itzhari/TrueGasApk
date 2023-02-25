// // import { useEffect } from 'react';
// // import { StyleSheet } from 'react-native';
// // import { Text, View } from '../components/Themed';
// import { RootTabScreenProps } from '../types';
// import { StatusBar } from 'expo-status-bar';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import _ from "lodash"
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import AssignmentModel from './../Models/AssignmentModel';


// export default function AssignmentsScreen({ navigation }: RootTabScreenProps<'Assignments'>) {


//     interface Task {
//         date: Date;
//         title: string;
//         isDone: boolean;
//     }

//     const dataArray: Task[] = [
//         { date: new Date(2022, 1, 1), title: 'Task 1', isDone: false },
//         { date: new Date(2022, 1, 3), title: 'Task 2', isDone: true },
//         { date: new Date(2022, 1, 2), title: 'Task 3', isDone: false },
//     ];

//     const [sortedArray, setSortedArray] = useState<Task[]>(dataArray);
//     const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

//     const sortArray = (prop: keyof Task) => {
//         let sorted = [...sortedArray];
//         sorted.sort((a: Task, b: Task) => {
//             if (a[prop] < b[prop]) return sortDirection === 'asc' ? -1 : 1;
//             if (a[prop] > b[prop]) return sortDirection === 'asc' ? 1 : -1;
//             return 0;
//         });
//         setSortedArray(sorted);
//         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     };

//     const renderItem = ({ item }: { item: Task }) => (
//         <View style={styles.tableRow}>
//             <Text style={styles.columnRowTxt}>{item.date.toLocaleDateString()}</Text>
//             <Text style={styles.columnRowTxt}>{item.title}</Text>
//             <Text style={styles.columnRowTxt}>{item.isDone ? 'Done' : 'Not Done'}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <StatusBar style='auto' />
//             <View style={styles.tableHeader}>
//                 <TouchableOpacity style={styles.columnHeader} onPress={() => sortArray('date')}>
//                     <Text style={styles.columnHeaderTxt}>Date</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.columnHeader} onPress={() => sortArray('title')}>
//                     <Text style={styles.columnHeaderTxt}>Title</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.columnHeader} onPress={() => sortArray('isDone')}>
//                     <Text style={styles.columnHeaderTxt}>Status</Text>
//                 </TouchableOpacity>
//             </View>
//             <FlatList
//                 data={sortedArray}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.date.toISOString()}
//             />
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80
//     },
//     tableHeader: {
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//         alignItems: "center",
//         backgroundColor: "#37C2D0",
//         borderTopEndRadius: 10,
//         borderTopStartRadius: 10,
//         height: 50
//     },
//     tableRow: {
//         flexDirection: "row",
//         height: 40,
//         alignItems: "center",
//     },
//     columnHeader: {
//         width: "35%",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     columnHeaderTxt: {
//         color: "white",
//         fontWeight: "bold",
//         fontSize: 16,
//     },
//     columnRowTxt: {
//         width: "33.5%",
//         textAlign: "center",
//         fontSize: 14,
//     }
// });

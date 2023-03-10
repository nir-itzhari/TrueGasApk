import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import AssignmentModel from './../../Models/AssignmentModel';
import moment from 'moment';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DataPagnition } from './DataPagnition';
import { format } from 'date-fns';

interface LeftContentProps {
    size: number;
}


interface Props {
    data: AssignmentModel[] | null;
}

const PAGE_SIZE = 10;

const AssignmentsPagnition = ({ data }: Props) => {
    // const dataArray: AssignmentModel[] = [
    //     { assignmentId: "1", date: new Date(2022, 1, 1), title: 'התקנת מחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "2", date: new Date(2022, 1, 2), title: 'התקנת כיריים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "3", date: new Date(2022, 1, 11), title: 'התקנת מחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "4", date: new Date(2022, 1, 15), title: 'התקנת מונה', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "5", date: new Date(2022, 1, 24), title: 'הנחת צנרת', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "6", date: new Date(2022, 1, 13), title: 'קריאת חירום', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "7", date: new Date(2022, 1, 16), title: 'העתקת נקודה', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "8", date: new Date(2022, 1, 24), title: 'התקנת מיכלים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "9", date: new Date(2022, 1, 13), title: 'תיקון מחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "10", date: new Date(2022, 1, 16), title: 'התכנות למחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "11", date: new Date(2022, 1, 24), title: 'תיקון מחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "12", date: new Date(2022, 1, 13), title: 'התכנות למחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "13", date: new Date(2022, 1, 16), title: 'שידרוג למחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "14", date: new Date(2022, 1, 24), title: 'התקנת מיכלים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: false },
    //     { assignmentId: "15", date: new Date(2022, 1, 13), title: 'התכנות למחמם מים', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    //     { assignmentId: "16", date: new Date(2022, 1, 16), title: 'קריאת חירום', description: "פירוט", client_id: null, user_id: null, imageFile: null, imageName: null, isDone: true },
    // ];

    const LeftContent = (props: LeftContentProps) => <Avatar.Icon {...props} icon="folder" />

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / PAGE_SIZE);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderItem = ({ item }: { item: AssignmentModel }) => (
        <View style={styles.itemContainer}>
            <Card>
                <Card.Title title={item.title} subtitle={item.description} left={LeftContent} />
                <Card.Content>
                    {/* <Text variant="titleLarge">{item.title}</Text> */}
                    {/* <Text variant="bodyMedium">{format(item.date, 'dd/MM/yyyy')}</Text> */}
                    <Text variant="bodySmall">{format(item.date, 'dd/MM/yyyy')}</Text>
                </Card.Content>
                {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                <Card.Actions>
                    <Button>ערוך</Button>
                    <Button>מחק</Button>
                </Card.Actions>
            </Card>
        </View>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>אין תוצאות</Text>}
                contentContainerStyle={styles.flatlistContentContainer}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                    style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                >
                    <Text style={styles.paginationButtonText}>{'< הקודם'}</Text>
                </TouchableOpacity>
                <Text style={styles.paginationText}>{`עמוד ${currentPage} מתוך ${totalPages}`}</Text>
                <TouchableOpacity
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                >
                    <Text style={styles.paginationButtonText}>{'הבא >'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    flatlistContentContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    paginationButton: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    disabledButton: {
        opacity: 0.4,
    },
    paginationButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paginationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AssignmentsPagnition;
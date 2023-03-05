import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, ToastAndroid, View } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { addDays, subDays, format } from 'date-fns';
import { useState } from 'react';
import he from 'date-fns/locale/he';




export const DataPagnition = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const handleDatePress = (date: Date) => {
        setSelectedDate(date);
    };

    const handleMoveLeft = () => {
        setCurrentDate(subDays(currentDate, 1));
        setSelectedDate(subDays(selectedDate, 1));
    };

    const handleMoveRight = () => {
        setCurrentDate(addDays(currentDate, 1));
        setSelectedDate(addDays(selectedDate, 1));
    };

    const dates = [];
    const start = subDays(selectedDate, 1);
    for (let i = 0; i < 3; i++) {
        dates.push(addDays(start, i));
    }
    console.log(dates);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftButton} onPress={handleMoveLeft}>
                <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>

            <View style={styles.datesContainer}>
                {dates.map((date, index) => (
                    <TouchableOpacity
                        key={date.toISOString()}
                        onPress={() => handleDatePress(date)}
                        style={[
                            styles.dateWrapper,
                            date === selectedDate && styles.selectedDateWrapper,
                            index === 1 && styles.centerDateWrapper
                        ]}
                    >
                        <Text
                            style={[
                                styles.weekday,
                                index === 1 && styles.selectedDateText
                            ]}
                        >
                            {format(date, 'EEEE', { locale: he })}
                        </Text>
                        <Text
                            style={[
                                styles.date,
                                index === 1 && styles.selectedDateText
                            ]}
                        >
                            {format(date, 'dd/MM/yyyy')}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.rightButton} onPress={handleMoveRight}>
                <Text style={[styles.arrow, { textAlign: 'right' }]}>{'<'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    datesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateWrapper: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDateWrapper: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        fontWeight: 'bold',
    },
    centerDateWrapper: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: "#ccc",
        borderRadius: 5,
        fontWeight: 900,
    },
    weekday: {
        fontSize: 14,
        color: '#A1A1AA',
    },
    selectedWeekday: {
        color: '#fff',
    },
    selectedDateText: {
        color: 'black',
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4B5563',
    },
    selectedDate: {
        color: '#fff',
    },
    leftButton: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
    },
    rightButton: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: '#E5E7EB',
    },
    arrow: {
        fontSize: 20,
        color: '#A1A1AA',
        fontWeight: 'bold',
    },
});
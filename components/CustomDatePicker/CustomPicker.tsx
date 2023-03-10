// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { ClientModel } from '../../Models/ClientModel';
// import config from '../../Utils/Config';

// interface PickerItem {
//     id: string;
//     fullName: string;
// }

// interface CustomPickerProps {
//     onSelect: (item: PickerItem) => void;
//     style?: object;
//     selectedTextStyle?: object;
//     unselectedTextStyle?: object;
// }

// const CustomPicker = ({ onSelect, style, selectedTextStyle, unselectedTextStyle }: CustomPickerProps) => {
//     const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
//     const [clients, setClients] = useState<PickerItem[]>([]);
//     const [showList, setShowList] = useState(false);

//     const handlePress = (item: PickerItem) => {
//         setSelectedItem(item);
//         setShowList(false);
//         onSelect(item);
//     };

//     const toggleList = () => {
//         setShowList(!showList);
//         if (selectedItem) clearSelection()

//     };

//     const clearSelection = () => {
//         setSelectedItem(null);
//         onSelect(null);
//         setShowList(false);
//     };

//     const getClients = async () => {
//         let transformedData: PickerItem[] = [];
//         try {
//             const result = await axios.get<ClientModel[]>(config.baseUrl + '/clients');
//             transformedData = result.data.map((client: ClientModel): PickerItem => {
//                 return {
//                     id: client._id,
//                     fullName: client.fullName || '',
//                 };
//             });
//         } catch (error) {
//             console.log(error);
//         }
//         return transformedData;
//     };

//     useEffect(() => {
//         getClients()
//             .then((res) => res)
//             .then((clients) => setClients(clients));
//     }, []);

//     return (
//         <View style={[styles.container, style]}>
//             <View style={[styles.listItemContainer, { flex: 1, flexDirection: "row" }]}>
//                 <TouchableOpacity onPress={toggleList}>
//                     <Text style={[selectedItem && { color: "royalblue", fontWeight: "900" }]}>
//                         {selectedItem ? selectedItem.fullName : 'בחר לקוח'}
//                         {selectedItem && <Text style={styles.clearCheckMark}>   X</Text>}
//                     </Text>

//                 </TouchableOpacity>
//             </View>
//             {showList && (
//                 <View style={styles.listContainer}>
//                     {clients.map((item: PickerItem) => (
//                         <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
//                             <View style={styles.listItemContainer}>
//                                 {/* <TouchableOpacity onPress={clearSelection}>
//                                     {selectedItem?.id === item.id && <Text style={styles.cleaCheckMark}>X</Text>}
//                                 </TouchableOpacity> */}
//                                 <Text style={[styles.listItemText, selectedItem?.id === item.id && styles.selectedItemText]}>
//                                     {item.fullName}
//                                 </Text>
//                                 {selectedItem?.id === item.id && <Text style={styles.checkmark}>✓</Text>}

//                             </View>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         borderColor: 'gray',
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 10,
//     },
//     selectedItemText: {
//         fontWeight: 'bold',
//     },
//     listContainer: {
//         marginTop: 5,
//         borderColor: 'gray',
//         borderTopWidth: 1,
//         // borderWidth: 1,
//         padding: 8,
//         borderRadius: 10
//     },
//     listItemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 5,
//     },
//     listItemText: {
//         flex: 1,
//     },
//     checkmark: {
//         fontSize: 16,
//         color: 'green',
//     },
//     clearCheckMark: {
//         fontSize: 16,
//         color: 'red',
//         marginHorizontal: 10


//     },
// });

// export default CustomPicker;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { useApi } from '../../hooks/useApi';
import { ClientModel } from '../../Models/ClientModel';
import config from '../../Utils/Config';

interface PickerItem {
    id: string;
    fullName: string;
}

interface CustomPickerProps {
    onSelect: (item: string) => void;
    style?: object;
    selectedTextStyle?: object;
    unselectedTextStyle?: object;
}

const CustomPicker = ({ onSelect, style, selectedTextStyle, unselectedTextStyle }: CustomPickerProps) => {
    const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
    const [clients, setClients] = useState<PickerItem[]>([]);
    const [showList, setShowList] = useState(false);
    const { isInternetReachable, isServerOnline } = useApi()

    const toggleList = () => {
        setShowList(!showList);
    };

    const handlePress = (item: PickerItem) => {
        setSelectedItem(item);
        setShowList(false);
        onSelect(item.id);
    };

    const clearSelection = () => {
        setSelectedItem(null);
        onSelect(null);
        setShowList(false);
    };

    const getClients = async () => {
        try {
            const result = await axios.get<ClientModel[]>(config.baseUrl + '/clients');
            const transformedData = result.data.map((client: ClientModel): PickerItem => {
                return {
                    id: client._id,
                    fullName: client.fullName || '',
                };
            });
            setClients(transformedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClients();
        if (isInternetReachable && isServerOnline) {
        }
        else if (!isInternetReachable) {
            ToastAndroid.show('No internet access', 10000);
        }
        else {
            ToastAndroid.show('Server is Offline', 10000);
        }
    }, []);

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={toggleList}>
                <Text style={[styles.selectedText, selectedItem && selectedTextStyle]}>{selectedItem ? selectedItem.fullName : 'בחר לקוח'}</Text>
            </TouchableOpacity>
            {showList && (
                <Modal animationType="slide" transparent={true} visible={showList} onRequestClose={() => setShowList(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <TouchableOpacity onPress={clearSelection}>
                                <Text style={styles.clearButton}>איפוס</Text>
                            </TouchableOpacity>
                            <View style={styles.modalItemsContainer}>
                                {clients.map((item: PickerItem) => (
                                    <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
                                        <View style={styles.modalItem}>
                                            <Text style={[styles.modalText, selectedItem?.id === item.id && styles.selectedItemText]}>{item.fullName}</Text>
                                            {selectedItem?.id === item.id && <Text style={styles.checkmark}>✓</Text>}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity onPress={() => setShowList(false)}>
                                <Text style={styles.cancelButton}>ביטול</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    touchableOpacity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    clearButton: {
        color: 'red',
        alignSelf: 'flex-end',
    },
    modalItemsContainer: {
        marginTop: 20,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    modalText: {
        flex: 1,
        fontSize: 16,
    },
    selectedItemText: {
        fontWeight: 'bold',
    },
    checkmark: {
        fontSize: 16,
        marginLeft: 5,
        color: 'green',
    },
    cancelButton: {
        color: 'gray',
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default CustomPicker;
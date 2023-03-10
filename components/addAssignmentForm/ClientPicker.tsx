// import { Feather } from "@expo/vector-icons";
// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { View, StyleSheet, ToastAndroid } from "react-native";
// import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
// import { useApi } from "../../hooks/useApi";
// import { ClientModel } from "../../Models/ClientModel";
// import { ClientContext } from "../../navigation/ClientPickerContext";
// import config from "../../Utils/Config";

// export interface ClientPickerProps {
//     value: string | undefined;
//     onChange: (value: string | undefined) => void;

// }

// export interface ClientPicker {
//     id: string;
//     title: string;
// }

// const ClientPicker: React.FC<ClientPickerProps> = ({
//     value,
//     onChange,
// }) => {
//     const [selectedItem, setSelectedItem] = useState<ClientPicker>();
//     const [clients, setClients] = useState<ClientPicker[]>([]);
//     const { client, setClient } = useContext(ClientContext);
//     const [loading, setLoading] = useState(false)
//     const { isInternetReachable, isServerOnline } = useApi()

//     const getClients = async () => {
//         let transformedData: ClientPicker[] = [];
//         try {
//             const result = await axios.get<ClientModel[]>(config.baseUrl + "/clients");
//             transformedData = result.data.map(
//                 (client: ClientModel): ClientPicker => {
//                     return {
//                         id: client._id,
//                         title: client.fullName || "",
//                     };
//                 }
//             );
//         } catch (error) {
//             console.log(error);
//         }
//         return transformedData;
//     };

//     useEffect(() => {


//         switch (true) {
//             case isInternetReachable && isServerOnline:
//                 getClients()
//                     .then((res) => res)
//                     .then((clients) => setClients(clients));
//                 break;
//             case !isInternetReachable:
//                 ToastAndroid.show('No internet access', 10000);
//                 break;
//             case !isServerOnline:
//                 ToastAndroid.show('Server is Offline', 10000);
//                 break;
//             default:
//                 ToastAndroid.show('No internet access and Server is Offline', 10000);
//                 break;
//         }
//     }, []);

//     const handleSelectItem = (item: ClientPicker) => {
//         setSelectedItem(item);
//         setClient(item);
//         onChange(item?.id);
//         console.log(item)
//     };

//     return (
//         <View style={styles.pickerContainer}>
//             <AutocompleteDropdown
//                 clearOnFocus={false}
//                 closeOnBlur={true}
//                 closeOnSubmit={false}
//                 onSelectItem={handleSelectItem}
//                 dataSet={clients}
//                 debounce={600}
//                 loading={loading}
//                 textInputProps={{
//                     placeholder: 'בחר לקוח',
//                     autoCorrect: false,
//                     autoCapitalize: 'none',
//                     style: {
//                         borderRadius: 25,
//                         backgroundColor: '#383b42',
//                         color: '#fff',
//                         paddingLeft: 18,
//                     },
//                 }}
//                 inputContainerStyle={{
//                     backgroundColor: '#383b42',
//                     borderRadius: 25,
//                 }}
//                 suggestionsListContainerStyle={{
//                     backgroundColor: '#383b42',
//                 }}
//                 suggestionsListTextStyle={{
//                     color: '#fff',
//                 }}
//                 ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
//                 ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     pickerContainer: {
//         // backgroundColor: "#CCC",
//         zIndex: 999,
//         padding: 5,
//         borderRadius: 5,
//         marginBottom: 5,
//     },
// });

// export default ClientPicker;
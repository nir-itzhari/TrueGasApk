// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { View, StyleSheet } from "react-native";
// import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
// import { ClientModel } from "../../Models/ClientModel";
// import { UserContext } from "../../navigation/UserPickerContext";
// import config from "../../Utils/Config";



// export interface UserPicker {
//     id: string
//     title: string
// }



// const UserPicker: React.FC = () => {
//     const [selectedItem, setSelectedItem] = useState<UserPicker | null>();
//     const [users, setClients] = useState<UserPicker[]>([])
//     const { setUser } = useContext(UserContext);





//     const getUsers = async () => {
//         let transformedData: UserPicker[] = []
//         try {
//             const result = await axios.get<ClientModel[]>(config.baseUrl + '/clients')
//             transformedData = result.data.map((client: ClientModel): UserPicker => {
//                 return {
//                     id: client._id,
//                     title: client.fullName || ''
//                 }
//             });
//         } catch (error) {
//             console.log(error)
//         }

//         return transformedData
//     }

//     useEffect(() => {
//         getUsers()
//             .then((res) => res)
//             .then(users =>
//                 setClients(users))
//     }, [])

//     const handleSelectItem = (item: UserPicker) => {
//         setSelectedItem(item);
//         setUser(item); // update client state here
//     };

//     return (
//         <View style={styles.pickerContainer}>
//             <AutocompleteDropdown
//                 clearOnFocus={false}
//                 closeOnBlur={true}
//                 closeOnSubmit={false}
//                 onSelectItem={handleSelectItem} // call handleSelectItem on item selection
//                 dataSet={users}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     pickerContainer: {
//         backgroundColor: "#37C2D0",
//         zIndex: 1,
//         padding: 100
//     }
// });

// export default UserPicker;
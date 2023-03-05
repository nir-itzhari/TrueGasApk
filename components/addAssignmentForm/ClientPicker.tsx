import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { ClientModel } from "../../Models/ClientModel";
import { ClientContext } from "../../navigation/ClientPickerContext";
import config from "../../Utils/Config";



export interface ClientPicker {
    id: string
    title: string
}

const ClientPicker: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<ClientPicker | null>();
    const [clients, setClients] = useState<ClientPicker[]>([])
    const { client, setClient } = useContext(ClientContext);





    const getClients = async () => {
        let transformedData: ClientPicker[] = []
        try {
            const result = await axios.get<ClientModel[]>(config.baseUrl + '/clients')
            transformedData = result.data.map((client: ClientModel): ClientPicker => {
                return {
                    id: client._id,
                    title: client.fullName || ''
                }
            });
        } catch (error) {
            console.log(error)
        }

        return transformedData
    }

    useEffect(() => {
        getClients()
            .then((res) => res)
            .then(clients =>
                setClients(clients))
    }, [])

    const handleSelectItem = (item: ClientPicker) => {
        setSelectedItem(item);
        setClient(item); // update client state here
    };

    return (
        <View style={styles.pickerContainer}>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                onSelectItem={handleSelectItem} // call handleSelectItem on item selection
                dataSet={clients}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: "#CCC",
        zIndex: 1,
        padding: 5,
        borderRadius: 5

    }
});

export default ClientPicker;
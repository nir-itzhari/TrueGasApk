import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { ClientContext } from '../../navigation/ClientPickerContext';
import { AssignmentsStackScreenProps } from '../../types';
import ClientPicker from './ClientPicker';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthContext';
import { Switch } from 'react-native-paper';
import AssignmentModel from '../../Models/AssignmentModel';
import AssignmentDatePicker from './DatePicker';


export default function AddAssignmentScreen({ navigation }: AssignmentsStackScreenProps<'AddAssignmentScreen'>) {
    const { register, control, setValue, handleSubmit, formState: { errors }, reset } = useForm<AssignmentModel>();
    const { client } = useContext(ClientContext);
    const { user_id } = useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
    const [isDone, setIsDone] = useState("true");
    const [buildingType, setBuildingType] = useState('house');

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handleBuildingTypeChange = (value: string) => {
        setBuildingType(value);
    };

    const handleIsDoneChange = (value: string) => {
        setIsDone(value);
    };

    const onSubmit: SubmitHandler<AssignmentModel> = async (assignment) => {
        assignment.client_id = client.id;
        assignment.user_id = user_id;
        assignment.isDone = isDone === "true" ? true : false;
        console.log(assignment);

    };

    const AddClientButton = () => {

        return (
            <View>
                <Button icon="plus" mode="contained" onPress={() => navigation.navigate("AddClientScreenModal")}>הוסף לקוח</Button>
            </View>
        )
    }
    useEffect(() => {
        navigation.setOptions({
            title: "הוסף משימה"
        })
    }, [])

    return (
        <View style={styles.form}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                <Text>לקוח קיים?</Text>
            </View>
            {isSwitchOn ? <ClientPicker /> : <AddClientButton />}

            <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                    <AssignmentDatePicker value={value} onChange={onChange} />
                )}
            />


            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="כותרת"
                        mode="outlined"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        style={styles.input}
                        error={errors.title ? true : false}
                    />
                )}
                name="title"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.title && <Text style={styles.error}>*שדה חובה</Text>}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="תיאור"
                        mode="outlined"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        style={styles.input}
                        multiline
                        numberOfLines={3}
                        error={errors.description ? true : false}
                    />
                )}
                name="description"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.description && <Text style={styles.error}>*שדה חובה</Text>}

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text>בוצעה?</Text>
                <RadioButton.Group onValueChange={handleIsDoneChange} value={isDone}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton value="true" />
                        <Text style={{ marginRight: 10 }}>כן</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton value="false" />
                        <Text>לא</Text>
                    </View>
                </RadioButton.Group>
            </View>

            <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
            >
                הוסף משימה
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 20
    },
    input: {
        marginBottom: 10,
        backgroundColor: "#fff"
    },
    button: {
        marginTop: 10
    },
    error: {
        color: "red",
        fontSize: 14,
        marginBottom: 5
    }
})


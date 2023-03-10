import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AssignmentsStackScreenProps } from '../../types';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthContext';
import { Switch } from 'react-native-paper';
import AssignmentModel from '../../Models/AssignmentModel';
import AssignmentDatePicker from './DatePicker';
import CustomPicker from '../CustomDatePicker/CustomPicker';
import { useApi } from '../../hooks/useApi';


export default function AddAssignmentScreen({ navigation }: AssignmentsStackScreenProps<'AddAssignmentScreen'>) {
    const { control, handleSubmit, formState: { errors } } = useForm<AssignmentModel>();
    const { user_id } = useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
    const [isDone, setIsDone] = useState("true");
    const { isInternetReachable, isServerOnline } = useApi()

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    const handleIsDoneChange = (value: string) => {
        setIsDone(value);
    };

    const onSubmit: SubmitHandler<AssignmentModel> = async (assignment) => {
        assignment.user_id = user_id;
        assignment.isDone = isDone === "true" ? true : false
        console.log(assignment)

    };

    const AddClientButton = () => {

        return (
            <View>
                <Button style={{ margin: 10 }} icon="plus" mode="contained" onPress={() => navigation.navigate("AddClientScreenModal")}>הוסף לקוח</Button>
            </View>
        )
    }
    useEffect(() => {
        navigation.setOptions({
            title: "הוסף משימה",
            headerTitleAlign: 'center'
        })
    }, [])

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <View style={styles.header}>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                    <Text style={styles.headerText}>לקוח קיים?</Text>
                </View>
                <View style={styles.clientPickerContainer}>
                    {isSwitchOn ? (
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomPicker onSelect={onChange} />
                            )}
                            name="client_id"
                            rules={{ required: true }}
                        />
                    ) : (
                        <AddClientButton />
                    )}
                    {errors.client_id && <Text style={styles.error}>*שדה חובה</Text>}
                </View>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <AssignmentDatePicker value={value} onChange={onChange} />
                    )}
                    name="date"
                    rules={{ required: true }}
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
                    rules={{ required: true, minLength: 2 }}
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
                            numberOfLines={10}
                            error={errors.description ? true : false}
                        />
                    )}
                    name="description"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.description && <Text style={styles.error}>*שדה חובה</Text>}

                <View style={styles.isDoneContainer}>
                    <Text>בוצעה?</Text>
                    <RadioButton.Group onValueChange={handleIsDoneChange} value={isDone}>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton value="true" />
                            <Text style={styles.radioButtonText}>כן</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton value="false" />
                            <Text style={styles.radioButtonText}>לא</Text>
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
            </View >
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 5,
    },
    headerText: {
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 10,
    },
    clientPickerContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    formContainer: {
        flexGrow: 1,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    input: {
        marginTop: 10,
    },
    isDoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioButtonText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
    },
    button: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    error: {
        color: "red",
        marginTop: 5,
        marginLeft: 20,
    },
});

// import React, { useContext, useEffect, useState } from 'react';
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
// import { View, Text, StyleSheet, ScrollView, FlatList, Platform } from 'react-native';
// import { ClientContext } from '../../navigation/ClientPickerContext';
// import { AssignmentsStackScreenProps } from '../../types';
// import ClientPicker from './ClientPicker';
// import { Button, RadioButton, TextInput } from 'react-native-paper';
// import { AuthContext } from '../../navigation/AuthContext';
// import { Switch } from 'react-native-paper';
// import AssignmentModel from '../../Models/AssignmentModel';
// import AssignmentDatePicker from './DatePicker';

// export default function AddAssignmentScreen({ navigation }: AssignmentsStackScreenProps<'AddAssignmentScreen'>) {
//     const { register, control, setValue, handleSubmit, formState: { errors }, reset } = useForm<AssignmentModel>();
//     const { client } = useContext(ClientContext);
//     const { user_id } = useContext(AuthContext);
//     const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
//     const [isDone, setIsDone] = useState("true");
//     const [buildingType, setBuildingType] = useState('house');

//     const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

//     const handleBuildingTypeChange = (value: string) => {
//         setBuildingType(value);
//     };

//     const handleIsDoneChange = (value: string) => {
//         setIsDone(value);
//     };

//     const onSubmit: SubmitHandler<AssignmentModel> = async (assignment) => {
//         assignment.client_id = client.id;
//         assignment.user_id = user_id;
//         assignment.isDone = isDone === "true" ? true : false;
//         console.log(assignment)
//     };

//     const AddClientButton = () => {
//         return (
//             <View>
//                 <Button style={styles.button} icon="plus" mode="contained" onPress={() => navigation.navigate("AddClientScreenModal")}>הוסף לקוח</Button>
//             </View>
//         )
//     }

//     useEffect(() => {
//         navigation.setOptions({
//             title: "הוסף משימה",
//             headerTitleAlign: 'center'
//         })
//     }, [])

//     const renderHeader = () => {
//         return (
//             <View style={styles.header}>
//                 <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
//                 <Text style={styles.headerText}>לקוח קיים?</Text>
//             </View>
//         );
//     };

//     const renderSeparator = () => {
//         return (
//             <View style={styles.separator} />
//         );
//     };

//     const renderFooter = () => {
//         return (
//             <Button
//                 mode="contained"
//                 style={styles.footerButton}
//                 onPress={handleSubmit(onSubmit)}>
//                 הוסף משימה
//             </Button>
//         );
//     };

//     return (

//         <FlatList
//             keyboardShouldPersistTaps="always"
//             data={['header', 'client_id', 'date', 'title', 'description', 'isDone']}
//             renderItem={({ item }) => {
//                 switch (item) {
//                     case 'header':
//                         return renderHeader();
//                     case 'client_id':
//                         return (
//                             <View style={styles.field}>
//                                 {isSwitchOn ? (
//                                     <View>
//                                         <Controller
//                                             control={control}
//                                             rules={{ required: true }}
//                                             render={({ field: { onChange, onBlur, value } }) => (
//                                                 <ClientPicker
//                                                     value={value}
//                                                     onChange={onChange}
//                                                 />
//                                             )}
//                                             name="client_id"
//                                         />
//                                         <Text style={styles.error}>{errors.client_id && "חובה לבחור לקוח"}</Text>
//                                     </View>
//                                 ) : (
//                                     <View>
//                                         <AddClientButton />
//                                     </View>
//                                 )}
//                             </View>
//                         );
//                     case 'date':
//                         return (
//                             <View style={styles.field}>
//                                 <Controller
//                                     control={control}
//                                     rules={{ required: true }}
//                                     render={({ field: { onChange, onBlur, value } }) => (
//                                         <AssignmentDatePicker
//                                             value={value}
//                                             onChange={onChange}
//                                         />
//                                     )}
//                                     name="date"
//                                 />
//                                 <Text style={styles.error}>{errors.date && "חובה לבחור תאריך"}</Text>
//                             </View>
//                         );
//                     case 'title':
//                         return (
//                             <View style={styles.field}>
//                                 <Controller
//                                     control={control}
//                                     rules={{ required: true }}
//                                     render={({ field: { onChange, onBlur, value } }) => (
//                                         <TextInput
//                                             label="כותרת"
//                                             mode="outlined"
//                                             onChangeText={onChange}
//                                             onBlur={onBlur}
//                                             value={value}
//                                             style={styles.textInput}
//                                         />
//                                     )}
//                                     name="title"
//                                     defaultValue=""
//                                 />
//                                 <Text style={styles.error}>{errors.title && "חובה למלא כותרת"}</Text>
//                             </View>
//                         );
//                     case 'description':
//                         return (
//                             <View style={styles.field}>
//                                 <Controller
//                                     control={control}
//                                     rules={{ required: true }}
//                                     render={({ field: { onChange, onBlur, value } }) => (
//                                         <TextInput
//                                             label="תיאור"
//                                             mode="outlined"
//                                             multiline
//                                             numberOfLines={10}
//                                             onChangeText={onChange}
//                                             onBlur={onBlur}
//                                             value={value}
//                                             style={styles.textInput}
//                                         />
//                                     )}
//                                     name="description"
//                                     defaultValue=""
//                                 />
//                                 <Text style={styles.error}>{errors.description && "חובה למלא תיאור"}</Text>
//                             </View>
//                         );
//                     case 'isDone':
//                         return (
//                             <View style={styles.field}>
//                                 <Text style={styles.label}>האם המשימה הושלמה?</Text>
//                                 <RadioButton.Group onValueChange={handleIsDoneChange} value={isDone}>
//                                     <RadioButton.Item label="כן" value="true" />
//                                     <RadioButton.Item label="לא" value="false" />
//                                 </RadioButton.Group>
//                             </View>
//                         );
//                 }
//             }}
//             keyExtractor={(item) => item}
//             ListFooterComponent={renderFooter}
//             ItemSeparatorComponent={renderSeparator}
//         />
//     );
// }

// const styles = StyleSheet.create({
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     headerText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginLeft: 16,
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#e0e0e0',
//     },
//     field: {
//         padding: 16,
//     },
//     textInput: {
//         marginTop: 8,
//         backgroundColor: 'white',
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     button: {
//         margin: 8,
//     },
//     error: {
//         color: 'red',
//         fontSize: 14,
//         marginTop: 4,
//     },
//     footerButton: {
//         margin: 16,
//     },
// });
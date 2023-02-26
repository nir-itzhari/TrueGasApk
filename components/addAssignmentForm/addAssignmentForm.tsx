import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AssignmetnModel from '../../Models/AssignmentModel';

// type AddAssignmentFormData = Omit<AssignmetnModel,| 'assignmentId' | 'isDone'> & {
//     imageFile: FileList | null;
// };

// interface AddAssignmentFormProps {
//     onSubmit: (data: AddAssignmentFormData) => void;
// }

export const AddAssignmentForm: React.FC<AssignmetnModel> = () => {
    const { control, handleSubmit, formState: { errors }, } = useForm<AssignmetnModel>();

    // const onSubmitForm = useCallback((data: AddAssignmentFormData) => { onSubmit(data); }, [onSubmit],);


    const submit = (assignment: AssignmetnModel) => {
        console.log(assignment)

    }




    return (
        <View>
            <Controller
                control={control}
                name="date"
                defaultValue={new Date()}
                render={({ field: { onChange, value } }) => (
                    <TextInput onChangeText={onChange} value={value.toString()} />
                )}
            />
            {errors.date && <Text>{errors.date.message}</Text>}
            {/* <Controller
                control={control}
                name="description"
                defaultValue=""
                rules={{ required: 'Description is required' }}
                render={({ field: { onChange, value } }) => (
                    <TextInput onChangeText={onChange} value={value} />
                )}
            />
            {errors.description && <Text>{errors.description.message}</Text>} */}


             <Controller
                control={control}
                name="title"
                defaultValue=""
                rules={{ required: 'Description is required' }}
                render={({ field: { onChange, value } }) => (
                    <TextInput onChangeText={onChange} value={value} />
                )}
            />
            {errors.title && <Text>{errors.title.message}</Text>}
            <Controller
                control={control}
                name="imageFile"
                defaultValue={null}
                render={({ field: { onChange } }) => (
                    <Button title="Choose image" onPress={onChange} />
                )}
            />
            {errors.imageFile && <Text>{errors.imageFile.message}</Text>}
            
            <Button title="Add assignment" onPress={handleSubmit(submit)} />
        </View>
    );
};


const styles = StyleSheet.create({
    form: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3,
        elevation: 4,
    },
    input: {
        marginVertical: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        fontSize: 16,
    },
    button: {
        marginVertical: 16,
        backgroundColor: '#0077cc',
        borderRadius: 4,
        paddingVertical: 12,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: '#cc0000',
        fontSize: 14,
        marginTop: 4,
    },
});
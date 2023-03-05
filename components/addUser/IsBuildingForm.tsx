import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { ClientModel } from "../../Models/ClientModel";

interface IsBuildingFormProps {
    control: Control<ClientModel, any>,
    errors: FieldErrors<ClientModel>
}

export const IsBuildingForm = ({ control, errors }: IsBuildingFormProps): JSX.Element => {
    const { register } = useForm<ClientModel>();

    return (
        <View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        name="floor"
                        mode="outlined"
                        label="מספר קומה"
                        onChangeText={value => onChange(value)}
                        value={value}
                        {...register("floor", { required: true })}
                    />
                )}
                name="floor"
                rules={{ required: true }}
            />
            {errors.floor && (
                <TextInput style={styles.error}>{errors.floor.message}</TextInput>
            )}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        name="apartmentNumber"
                        onBlur={onBlur}
                        mode="outlined"
                        label="מספר דירה"
                        onChangeText={value => onChange(value)}
                        value={value}
                        {...register("apartmentNumber", { required: true })}
                    />
                )}
                name="apartmentNumber"
                rules={{ required: true }}
            />
            {errors.apartmentNumber && (
                <TextInput style={styles.error}>{errors.apartmentNumber.message}</TextInput>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        borderColor: "#cccccc",
        fontSize: 16
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 4
    }
});
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { ClientModel } from "../../Models/ClientModel";

interface NameAndAddressFormProps {
    control: Control<ClientModel, any>,
    errors: FieldErrors<ClientModel>
    buildingType: string
    phoneTwo: boolean
}


export const NameAndAddressForm = ({ control, errors, buildingType, phoneTwo }: NameAndAddressFormProps): JSX.Element => {
    const { register } = useForm<ClientModel>();

    return (
        <View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        name="fullName"
                        mode="outlined"
                        label="שם מלא"
                        onChangeText={value => onChange(value)}
                        value={value}
                        {...register("fullName", { required: true })}

                    />
                )}
                name="fullName"
                rules={{ required: true }}
            />
            < View >
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            mode="outlined"
                            label="מספר נייד"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                    name="phoneNumber"
                    rules={{ required: true }}
                />
                {phoneTwo ?
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                mode="outlined"
                                label="מספר נייד 2"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="phoneNumberTwo"
                        rules={{ required: true }}
                    />
                    : null}
            </View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        name="city"
                        mode="outlined"
                        label="עיר"
                        onChangeText={value => onChange(value)}
                        value={value}
                        {...register("city", { required: true })}

                    />
                )}
                name="city"
                rules={{ required: true }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        name="street"
                        mode="outlined"
                        label="רחוב"
                        onChangeText={value => onChange(value)}
                        value={value}
                        {...register("street", { required: true })}

                    />
                )}
                name="street"
                rules={{ required: true }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        name="buildingNumber"
                        mode="outlined"
                        label={buildingType !== "house" ? "מספר בניין" : "מספר בית"}
                        onChangeText={value => onChange(value)}
                        value={value}
                        {...register("buildingNumber", { required: true })}

                    />
                )}
                name="buildingNumber"
                rules={{ required: true }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        borderColor: '#cccccc',
        fontSize: 16,
    }

})
import { StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { AuthStackScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
// import useAxios from '../hooks/useAxios';



export default function LoginScreen({ navigation, route }: AuthStackScreenProps<'Login'>) {

    const [isUserIdFocused, setIsUserIdFocused] = useState(null);
    const [isPasswordFocused, setIsPasswordFocused] = useState(null);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const imageSource = require('../assets/images/truegas.jpg')
    const { login } = useAuth()


    const submit: (credentials: FieldValues) => Promise<void> = async (credentials) => {
        const { user_id, password } = credentials;
        login({ user_id, password })
    }

    const handleUserIdChange = (value: string) => {
        return value.replace(/[^0-9]/g, '');
    };

    const handlePasswordChange = (value: string) => {
        return value.replace(/[`'".,]/g, '');
    };


    useEffect(() => {
        navigation.setOptions({
            title: "כניסה"
        })
    }, [])



    return (
        <View style={styles.container}>
            <Text></Text>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <Image style={styles.image} source={imageSource} />
            <Controller
                control={control}
                rules={{ required: true, minLength: 5, maxLength: 14 }}
                render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputView, isUserIdFocused && { borderColor: "#FF1493", borderWidth: 2, opacity: 0.5 }]}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={value => onChange(handleUserIdChange(value))}
                            value={value}
                            placeholder="שם משתמש"
                            keyboardType="number-pad"
                            onFocus={() => setIsUserIdFocused(true)}
                            onBlur={() => setIsUserIdFocused(false)}
                            maxLength={14}
                        />
                    </View>
                )}
                name="user_id"
                defaultValue=""
            />
            {errors.user_id?.type === 'required' && <Text style={styles.error}>שם משתמש חובה.</Text>}
            {errors.user_id?.type === 'minLength' && <Text style={styles.error}>שם משתמש חייב להיות מינימום 5 תווים.</Text>}
            {errors.user_id?.type === 'maxLength' && <Text style={styles.error}>שם משתמש חייב להיות מקסימום 14 תווים.</Text>}

            <Controller
                control={control}
                rules={{ required: true, minLength: 5, maxLength: 8 }}
                render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputView, isPasswordFocused && { borderColor: "#FF1493", borderWidth: 2, opacity: 0.5 }]}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={value => onChange(handlePasswordChange(value))}
                            value={value}
                            placeholder="סיסמה"
                            secureTextEntry
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />
                    </View>
                )}
                name="password"
                defaultValue=""
            />
            {errors.password?.type === 'required' && <Text style={styles.error}>סיסמה חובה.</Text>}
            {errors.password?.type === 'minLength' && <Text style={styles.error}>סיסמה חייבת להיות מינימום 5 תווים.</Text>}
            {errors.password?.type === 'maxLength' && <Text style={styles.error}>סיסמה חייבת להיות מקסימום 8 תווים.</Text>}

            <TouchableOpacity disabled>
                <Text style={styles.forgot_button}>שכחת סיסמה? לחץ כאן!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(submit)}>
                <Text style={styles.textButton}>כניסה</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        width: 200,
        height: 100
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        textAlign: "center"
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        opacity: 0.5,
        textDecorationLine: "underline"
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        backgroundColor: "#FF1493",
    },
    textButton: {
        color: "white",
        fontWeight: "bold"
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

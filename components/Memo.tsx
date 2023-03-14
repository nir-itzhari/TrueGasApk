import React from "react";
import { Text, StyleSheet } from 'react-native';
import { useAppColorScheme } from '../hooks/useAppColorScheme';

const Memo = () => {
    const { appColorScheme } = useAppColorScheme();

    return (
        <React.Fragment>
            <Text style={{...styles.text, color: appColorScheme === "dark" ? "white" : "black"}}>*בחירת לקוח לא חובה ברגע זה לצורכי פיתוח</Text>
        </React.Fragment>
    );
};

export default React.memo(Memo);

const styles = StyleSheet.create({
    text: {
        opacity:0.6,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'left',
    },
});
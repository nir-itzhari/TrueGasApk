import React from "react";
import { Text, StyleSheet } from 'react-native';

const Memo = () => {
    return (
        <React.Fragment>
            <Text style={styles.text}>*בחירת לקוח לא חובה ברגע זה לצורכי פיתוח</Text>
        </React.Fragment>
    );
};

export default React.memo(Memo);

const styles = StyleSheet.create({
    text: {
        opacity:0.6,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'left',
    },
});
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type CustomButtonProps = {
    onPress: () => void;
    mode?: 'text' | 'outlined' | 'contained';
    color?: string;
    children: React.ReactNode;
    customStyle?: Record<string, unknown>;
};

const CustomButton = ({
    onPress,
    mode = 'contained',
    color = '#000000',
    children,
    customStyle,
}: CustomButtonProps) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#FFFFFF',
            borderColor: color || '#000000',
            borderWidth: 2,
            borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginVertical: 10,
            ...customStyle,
            shadowColor: color || '#000000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 3,
          },
        buttonText: {
            color,
            fontWeight: 'bold',
            fontSize: 16,
            textTransform: 'uppercase',
        },
    });

    return (
        <Button mode={mode} style={styles.button} onPress={onPress}>
            {children}
        </Button>
    );
};

export default CustomButton;
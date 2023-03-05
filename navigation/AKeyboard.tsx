import React, { createContext, ReactNode, useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const KeyboardAvoidingContext = createContext(null);


interface KeyboardAvoidingWrapperProps {
    children: ReactNode;
}
const KeyboardAvoidingWrapper = ({ children }: KeyboardAvoidingWrapperProps) => {
    const ref = useRef(null);

    return (
        <KeyboardAvoidingContext.Provider value={ref}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                ref={ref}>
                {children}
            </KeyboardAvoidingView>
        </KeyboardAvoidingContext.Provider>
    );
};

export default KeyboardAvoidingWrapper;
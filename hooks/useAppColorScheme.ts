import React, { createContext, useContext, useState } from 'react';
import { ColorSchemeName } from 'react-native';

interface AppColorSchemeContextProps {
  appColorScheme: ColorSchemeName;
  setAppColorScheme: (colorScheme: ColorSchemeName) => void;
}

export const AppColorSchemeContext = createContext<AppColorSchemeContextProps>({
  appColorScheme: 'light',
  setAppColorScheme: () => {},
});



export const useAppColorScheme = () => useContext(AppColorSchemeContext);

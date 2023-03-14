import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useAppColorScheme } from '../hooks/useAppColorScheme';



interface RadioButtonProps {
  options: {
    label: string;
    value: string
  }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = ({ options, selectedValue, onValueChange }: RadioButtonProps) => {
  const { appColorScheme } = useAppColorScheme();
  return (
    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      {options.map(({ label, value }) => (
        <React.Fragment key={value}>
          <RadioButton
            value={value}
            status={selectedValue === value ? 'checked' : 'unchecked'}
            onPress={() => onValueChange(value)}
          />
          <Text style={{ color: appColorScheme === "dark" ? "white" : "black" }}>{label}</Text>
        </React.Fragment>
      ))}
    </View>
  );
};

export default RadioGroup;
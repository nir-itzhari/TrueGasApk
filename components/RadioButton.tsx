import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';



interface RadioButtonProps {
  options: {
    label: string;
    value: string
  }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = ({ options, selectedValue, onValueChange }: RadioButtonProps) => {
  return (
    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      {options.map(({ label, value }) => (
        <React.Fragment key={value}>
          <Text>{label}</Text>
          <RadioButton
            value={value}
            status={selectedValue === value ? 'checked' : 'unchecked'}
            onPress={() => onValueChange(value)}
          />
        </React.Fragment>
      ))}
    </View>
  );
};

export default RadioGroup;
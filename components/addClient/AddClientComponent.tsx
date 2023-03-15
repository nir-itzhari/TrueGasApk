import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { Button, Switch, TextInput } from 'react-native-paper';
import { ClientModel } from '../../Models/ClientModel';
import RadioGroup from '../RadioButton';
import { IsBuildingForm } from './IsBuildingForm';
import { NameAndAddressForm } from './NameAndAddressForm';
import { useColorScheme } from 'react-native';
import { useAppColorScheme } from '../../hooks/useAppColorScheme';


export default function AddClientForm() {
  const { register, control, handleSubmit, reset, formState: { errors }, } = useForm<ClientModel>();
  const { appColorScheme } = useAppColorScheme();

  const [phoneTwo, setphoneTwo] = useState<boolean>(false);
  const onToggleSwitch = () => setphoneTwo(!phoneTwo);
  const [buildingType, setBuildingType] = useState('house');
  const handleBuildingTypeChange = (value: string) => {
    setBuildingType(value);
  };

  const onSubmit: SubmitHandler<ClientModel> = (client) => {
    console.log(client); // print the client object on the console
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.form, shadowColor: appColorScheme === "dark" ? 'white' : "#000000", backgroundColor: appColorScheme === "dark" ? "black" : "white" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginHorizontal: 0 }}>
            <Switch value={phoneTwo} onValueChange={onToggleSwitch} />
            <Text style={{color: appColorScheme === "dark" ? "white" : "black"}}>נייד נוסף?</Text>
          </View>
          <RadioGroup
            options={[
              { label: 'בניין משותף', value: 'building' },
              { label: 'בית פרטי', value: 'house' },
            ]}
            selectedValue={buildingType}
            onValueChange={handleBuildingTypeChange}
          />
        </View >
        <NameAndAddressForm control={control} errors={errors} buildingType={buildingType} phoneTwo={phoneTwo} />

        {buildingType !== "house" ? <IsBuildingForm control={control} errors={errors} /> : null}
        <Button icon="send" mode="contained" onPress={handleSubmit(onSubmit)}>
          הוסף
        </Button>
      </View>
    </ScrollView >
  );
};


const styles = StyleSheet.create({
  form: {
    padding: 16,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    marginVertical: 8,
    borderColor: '#cccccc',
    fontSize: 16,
  },
  button: {
    marginVertical: 16,
    backgroundColor: '#0077cc',
    borderRadius: 4,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 14,
    marginTop: 4,
  },
});
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface DatePickerProps {
    value: Date | undefined;
    onChange: (value: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [internalValue, setInternalValue] = useState<Date | undefined>(value);
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
        setShowPicker(false);
        if (date !== undefined) {
            setInternalValue(date);
            onChange(date);
        }
    };

    return (
        <View>
            <Button title={internalValue === undefined ? "בחר תאריך" : internalValue.toLocaleDateString()} onPress={() => setShowPicker(true)} />
            {showPicker && (
                <RNDateTimePicker
                    value={internalValue || new Date()}
                    maximumDate={new Date()}
                    minimumDate={new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())}
                    mode="date"
                    positiveButtonLabel="בחר"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default DatePicker;
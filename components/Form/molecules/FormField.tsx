import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import { AntDesign } from '@expo/vector-icons';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  icon? : keyof typeof AntDesign.glyphMap; 
}

const FormField = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  labelClassName,
  inputClassName,
  icon
}: FormFieldProps<T>) => (
  <>
    <Label text={label} className={labelClassName} />
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          className={inputClassName}
          iconName={icon}
        />
      )}
    />
  </>
);

export default FormField;
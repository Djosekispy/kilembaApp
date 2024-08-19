import React from 'react';
import { View } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import Constants from 'expo-constants';
import tw from 'twrnc';
import FormField from '@/components/Form/molecules/FormField';
import CustomButton from '@/components/Form/atoms/Button';
import { FormData, Loginschema } from '@/interfaces/ILoginForm';
import { yupResolver } from "@hookform/resolvers/yup";

const Form: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(Loginschema),
      })

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <View
      style={[
        tw.style('flex-1 justify-center p-2 px-3 bg-[#FFFFFF]'),
        { paddingTop: Constants.statusBarHeight },
      ]}
    >
      <FormField
        control={control}
        name="email"
        rules={{ required: true }}
        label="E-mail"
        labelClassName="mb-2 text-[#091130] font-semibold text-lg"
        inputClassName="mb-4 border h-12 rounded-md border-[#6A6A6A]"
        icon='user'
      />
      <FormField
        control={control}
        name="password"
        rules={{ required: true }}
        label="Palavra Passe"
        labelClassName="mb-2 text-[#091130] font-semibold text-lg"
        inputClassName="mb-4 border h-12 rounded-md border-[#6A6A6A]" 
        icon='key' />
      <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Form;

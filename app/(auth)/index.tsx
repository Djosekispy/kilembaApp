import React from 'react';
import { ImageBackground, View } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import tw from 'twrnc';
import FormField from '@/components/Form/molecules/FormField';
import CustomButton from '@/components/Form/atoms/Button';
import { FormData, Loginschema } from '@/interfaces/ILoginForm';
import { yupResolver } from "@hookform/resolvers/yup";
import SocialMediaLogin from '@/components/Form/molecules/SocialMediaLogin';
import Label from '@/components/Form/atoms/Label';
import imageBacground from '@/assets/images/loginBg.jpg';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';



const Form: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(Loginschema),
      })
   const [ isLoading , setIsLoading ] = React.useState<boolean>(false);
   const [passwordVisible, setPasswordVisible] = React.useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
    },2000)
  };

  return (
    
    <View className='flex-1'
    >
        <ImageBackground source={imageBacground} className='flex-1 justify-center' resizeMode='cover'>
    <View className='justify-center  backdrop-opacity-10 backdrop-invert bg-white/30 flex-1 px-8'>


      <Label text='Login' className='text-[#000] font-semiBoldPopins text-3xl text-center pt-12' />
     
      <FormField
        control={control}
        secure={false}
        name="email"
        rules={{ required: true }}
        label="E-mail"
        boardType='email-address'
        labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
        inputClassName={errors.email ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d] bg-[#091130] focus:bg-[#FFFFFF] pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
        icon='user'
      />
<View className='relative'>
      <FormField
        control={control}
        name="password"
        boardType='default'
        rules={{ required: true }}
        label="Palavra Passe"
        labelClassName="mb-2 mt-6 font-regularPopins text-sm text-[#000]"
        inputClassName={errors.password ? "mb-2 border h-12 rounded-md border-[#fc2d2d] bg-[#091130] pl-12" :"mb-2 border-2  h-12 rounded-lg bg-[#6A6A6A] border-[#5C5C5C]  focus:bg-[#FFFFFF] pl-12"}
        secure={!passwordVisible}
        icon='key' />

      <Feather
              name={passwordVisible ? "eye" : "eye-off"}
              size={20}
              color="#000"
              style={tw.style('absolute right-6 top-16')}
              onPress={() => setPasswordVisible(!passwordVisible)}
          />
          </View>
       

      <CustomButton
      isLoading={isLoading}
       title="Entrar" 
       className='rounded-full bg-[#091130] mt-12 h-12 justify-center items-center'
       onPress={handleSubmit(onSubmit)} 
       />

<View className='w-full flex-row justify-between  items-baseline pt-4'>
          <Label text='Esqueceu sua senha?' className='text-[#000]  font-semiBoldPopins text-sm text-center pt-2' />
          <Link href={'/(auth)/register'} asChild>
          <Label text='Criar Conta' className='text-[#000]  font-semiBoldPopins underline  text-sm text-center pt-2'/>
          </Link>
          </View>
       <SocialMediaLogin/>
       
    </View>
    </ImageBackground>
    </View>
    
  );
};

export default Form;

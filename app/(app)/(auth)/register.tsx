import React from 'react';
import { ImageBackground, View } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import tw from 'twrnc';
import FormField from '@/components/Form/molecules/FormField';
import CustomButton from '@/components/Form/atoms/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import SocialMediaLogin from '@/components/Form/molecules/SocialMediaLogin';
import Label from '@/components/Form/atoms/Label';
import imageBacground from '@/assets/images/registrBg.jpg';
import { Feather } from '@expo/vector-icons';
import { RegisterFormData , Registerschema } from '@/interfaces/IRegisterForm';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '@/utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { errorMessages } from '@/utils/errostypes';
import { useRouter } from 'expo-router';



const Form: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterFormData>({
        resolver: yupResolver(Registerschema),
      })
   const [ isLoading , setIsLoading ] = React.useState<boolean>(false);
   const [passwordVisible, setPasswordVisible] = React.useState(false);
   const [error, setError] = React.useState<string>('');
   const router = useRouter();
  const onSubmit: SubmitHandler<RegisterFormData> = async data => {
    setIsLoading(true);

    try {
      const myUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = myUser.user;

      sendEmailVerification(user)
      .then(async () => {
        await addDoc(collection(db, 'users'), {
          username : data.username,
          email : user.email,
          password : user.uid,
          createdAt : serverTimestamp(),
        });
        
      router.replace('/(app)/(auth)/')
      })
      .catch(async (err)=>{
      await deleteUser(user)
      setError(`Informações inválidas : ${err}`);
      })

    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorMessage = errorMessages[err.code] || 'Ocorreu um erro desconhecido.';
        setError(errorMessage);
      } else {
        setError(`Erro Desconhecido : ${err}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <View className='flex-1'
    >
        <ImageBackground source={imageBacground} className='flex-1 justify-center' resizeMode='cover'>
    <View className='justify-center  backdrop-opacity-10 backdrop-invert bg-white/30 flex-1 px-8'>


      <Label text='Registrar-se' className='text-[#000] font-semiBoldPopins text-3xl text-center pt-12' />
      { error && <Label text={error} className='text-[#fc2d2d]  font-semiBoldPopins text-sm text-center py-2' />}
     
      <FormField
        control={control}
        secure={false}
        name="username"
        rules={{ required: true }}
        label="Nome"
        boardType='default'
        labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
        inputClassName={errors.email ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d] bg-[#091130] focus:bg-[#FFFFFF] pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
        icon='user'
      />

<FormField
        control={control}
        secure={false}
        name="email"
        rules={{ required: true }}
        label="E-mail"
        boardType='email-address'
        labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
        inputClassName={errors.email ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d] bg-[#091130] focus:bg-[#FFFFFF] pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
        icon='paperclip'
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
       title="Abrir Conta" 
       className='rounded-full bg-[#000] mt-8 h-12 justify-center items-center'
       onPress={handleSubmit(onSubmit)} 
       />

        <View className='w-full flex-row justify-between mt-3'>
                <Label text='Já tens uma conta?' className='text-[#000]  font-semiBoldPopins text-sm text-center' />
        <Link href={'/(auth)/'} asChild>
          <Label text='Login' className='text-[#000]  font-semiBoldPopins underline  text-sm text-center' />
          </Link>
          </View>
       <SocialMediaLogin/>
       
    </View>
    </ImageBackground>
    </View>
    
  );
};

export default Form;

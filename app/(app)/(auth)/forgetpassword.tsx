import { Image, Text, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import picture from "@/assets/images/Picture.png";
import verified from '@/assets/images/verifyLogo.png'
import CustomButton from "@/components/Form/atoms/Button";
import React, { useEffect } from "react";
import { InputMaterialIcons } from "@/components/Form/atoms/Input";
import { useRouter } from "expo-router";
import CustomModal from "@/components/Modal/organism/CustomModal";
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { FirebaseError } from "firebase/app";
import { errorMessages } from "@/utils/errostypes";
import Label from "@/components/Form/atoms/Label";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ForgetPassword() {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [ email , setEmail ] = React.useState<string>('');
    const [ error , setError ] = React.useState<string>('');
    const router = useRouter();


    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
    
    const handleSubmit = async () => {
        setIsLoading(true);
      
        try {
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", email));
            
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                setError('Email não encontrado');
                return false;
            }
          openModal();
          await sendPasswordResetEmail(auth, email);
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

    useEffect(()=>{
        router.canGoBack();
    },[router]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
        >
        <CustomModal visible={modalVisible} onClose={closeModal} title="Parabéns!" imageSource={verified}>
        <Text className="px-12 text-center my-4 font-regularPopins"> 
                Código enviado com sucesso siga as próximas instruções contidas no e-mail que 
                acabamos de enviar

            </Text>
        </CustomModal>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} showsVerticalScrollIndicator={false}>
                <View className="flex-1 justify-center items-center px-4">
                    
                    <Text className="text-2xl pb-3 font-semiBoldPopins">Esqueceu sua senha?</Text>
                    
                    <View>
                        <Image source={picture} resizeMode="cover" />
                    </View>
                    <Text className="px-12 text-center my-4 font-regularPopins">
                        Insira o seu endereço de e-mail e lhe enviaremos um código de redifinição de senha!
                    </Text>
                    <View className="w-full">
                    { error && <Label text={error} className='text-[#fc2d2d]  rounded-xl font-semiBoldPopins text-sm text-center py-2' />}
     
                        <InputMaterialIcons
                            className="w-full h-12 rounded-md border-2 border-[#000] my-4 px-12"
                            iconName="email"
                            placeholder="example@gmail.com"
                            keyboardType="email-address"
                            onChangeText={(text)=>setEmail(text)}
                        />
                    </View>
                    <CustomButton
                        isLoading={isLoading}
                        title="Proximo"
                        className="rounded-full bg-[#000] w-full mt-12 h-12 justify-center items-center"
                        onPress={handleSubmit}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

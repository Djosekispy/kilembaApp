import Label from "@/components/Form/atoms/Label";
import Title from "@/components/Modal/atoms/title";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import picture from '@/assets/images/welcome.jpg'
import { Link } from "expo-router";


export default function Welcome(){
    

    return (
        <ImageBackground className="flex-1" source={picture} >
            <View className="flex-1"></View>
            <View className="justify-center items-center">
                <Title className="text-[#EEA651] text-2xl font-semiBoldPopins">Sorteio Kilemba</Title>
                <Label 
                text='Concorra ao sorteio a habilite-se a ganhar um dos imovéis e então ter a sua casa própria' 
                className="text-center font-regularPopins text-sm px-4 text-[#FFF]"
                />
            </View>
           <View className="justify-center items-center px-10 my-7">
            <Link asChild href={'/(app)/(auth)/'}>
           <TouchableOpacity className="justify-center items-center rounded-2xl bg-[#000] p-2 w-full">
                <Text className="text-[#FFF] font-mediumPopins text-lg">Iniciar</Text>
            </TouchableOpacity>
            </Link>
           </View>

            </ImageBackground>


    );
}
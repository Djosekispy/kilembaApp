import ImageAtom from "@/components/Modal/atoms/Image";
import Title from "@/components/Modal/atoms/title";
import { auth } from "@/utils/firebase";
import { View } from "react-native";
import picture from '@/assets/images/loginBg.jpg';

export default function Header() {
    const user = auth.currentUser;
    return (
        <View className='flex-row space-x-20 px-8 pt-12'>
            <View> 
                <Title className="font-regularPopins text-[#8997A9] text-lg"> Faça sua inscrição Agora </Title>
                <Title className='text-[#122D4D] font-semiBoldPopins text-md'> E ganhe! </Title>
            </View>
            <View className='w-20 h-20 rounded-full items-center justify-center bg-cover'>
                <ImageAtom
                    source={picture || user?.photoURL}
                    className="w-16 h-16 rounded-full"
                />
            </View>
        </View>
    );
}

import ImageAtom from "@/components/Modal/atoms/Image";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import picture from '@/assets/images/loginBg.jpg';
import Title from "@/components/Modal/atoms/title";
import Label from "@/components/Form/atoms/Label";
import HouseAtom from "@/components/candidateList/atoms/house";
import LocationMolecule from "@/components/Card/molecules/Location";
import { ScrollView } from "react-native";
import CustomButton from "@/components/Form/atoms/Button";
import React from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "@/utils/firebase";
import House from "@/interfaces/IHouse";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function HouseDetails() {
    const router = useRouter();
    router.canGoBack();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { width, height } = Dimensions.get('window');
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<House | null>(null);

    const loadHouseData = async () => {
        setIsLoading(true);
        try {
            if (id) {
                const docRef = doc(db, 'casas', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data() as House);
                } else {
                    console.log('No such document!');
                }
            } else {
                console.error('ID is missing');
            }
        } catch (err) {
            console.error('Erro ao buscar documento:', err);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadHouseData();
    }, []);

    return (
      <>
            {isLoading ? (
                <View className='flex-1 justify-center items-center'>
                    <ActivityIndicator size={35} color='#006EFF' />
                </View>
            ) : (
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="flex-1 relative" style={{position: 'relative'}}>
                <MaterialIcons name="arrow-back" style={{position: 'absolute', top: 40, left: 20, zIndex:1}}  size={26} color="black" onPress={()=>router.back()}/>
                 
                    <View style={{ width: width, height: height - 300 }}>
                        <ImageAtom className="w-full h-full" source={data?.imagem} />
                    </View>
                    <View className='flex-row justify-between mb-4 px-4'>
                        <View>
                            <LocationMolecule location={'Lubango-Huíla'} />
                            <HouseAtom address={data?.tipo || 'Tipo desconhecido'} />
                        </View>
                        <View className='flex-row items-center mt-1 p-2 rounded-md bg-[#B9B9B9]'>
                            <Label text={data?.nome || 'Estado desconhecido'} className="ml-1 text-[#478FF1] font-semiBoldPopins" />
                        </View>
                    </View>
                   
                    <Title className='text-[#2A2B3F] text-xl px-4 font-semiBoldPopins'>Descrição de Imovéis</Title>
                    <Label text={data?.descricao || 'Sem descrição disponível'} className='text-[#8C8C8C] font-regularPopins text-justify text-md px-2 mb-2' />
                    <View className='flex-1'></View>
                    <View className='px-4'>
                        <CustomButton
                            isLoading={isLoading}
                            title="Concorrer"
                            className="rounded-full bg-[#000] w-full  my-4 h-12 justify-center items-center"
                            onPress={() => router.replace('/(app)/(tabs)/subscribe')}
                        />
                    </View>
                </View>
                </ScrollView>
            )}
        
        </>
    );
}

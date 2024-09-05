import CandidateList from "@/components/candidateList/organism/CandidateList";
import CardList from "@/components/Card/organism/CardFlatlist";
import MyFlatList from "@/components/Flatlist/molecules/flatlist";
import Label from "@/components/Form/atoms/Label";
import Search from "@/components/HomeHeader/molecules/Search";
import Title from "@/components/Modal/atoms/title";
import SearchList from "@/components/Search/organism/SearchCandidate";
import { UserProps } from "@/interfaces/ICandidate";
import { db } from "@/utils/firebase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import {  FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { FontAwesome } from "@expo/vector-icons";
import { generatePDF } from "@/components/candidate/molecules/pdf";

type ScroolItensProps = {
    name : string;
    command : ()=>void
}
export default function Selected(){
    const [searchingData, setSearchingData] = React.useState<UserProps[]>([]);
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ apartament, setApartament] =  React.useState<UserProps[]>([]);
    const [selectedId, setSelectedId] = React.useState(null);

    const searchCandidateByName = async (name: string) => {
        try {
          setIsLoading(true);
          const candidatosRef = collection(db, "candidatos");
        
          const q = query(candidatosRef, 
              where("nome", ">=", name), 
              where("nome", "<=", name + '\uf8ff')
          );
          const querySnapshot = await getDocs(q);
      
          const candidates: UserProps[] = [];
          querySnapshot.forEach((doc) => {
            candidates.push({ 
              id: doc.id,
              nome: doc.data().nome,
              telefone: doc.data().telefone,
              endereco: doc.data().endereco,
              bilhete: doc.data().bilhete,
              certificado: doc.data().certificado,
              residencia: doc.data().residencia,
              tipo: doc.data().tipo,
              estado: doc.data().estado,
              perfilUrl: doc.data().perfilUrl
               });
          });
    
          setSearchingData(candidates);
        } catch (error) {
          console.error('Error searching candidates by name:', error);
          return [];
        }finally{
          setIsLoading(false)
        }
      };

      const getApartamentData = () => {
        setIsLoading(true);
        const q = query(collection(db, "apartamentosSorteados"));
         const unsubscribeData = onSnapshot(q, (querySnapshot) => {
            const modulo: any = [];
            querySnapshot.forEach((doc) => {
             modulo.push(doc.data());
            });
            setApartament(modulo);
            setIsLoading(false);
           });
       };

       const getGeminadas = () => {
        setIsLoading(true);
        const q = query(collection(db, "geminadasSorteados"));
         const unsubscribeData = onSnapshot(q, (querySnapshot) => {
            const modulo: any = [];
            querySnapshot.forEach((doc) => {
             modulo.push(doc.data());
            });
            setApartament(modulo);
            setIsLoading(false);
           });
       };

       const getInsolada = () => {
        setIsLoading(true);
        const q = query(collection(db, "insoladasSorteados"));
         const unsubscribeData = onSnapshot(q, (querySnapshot) => {
            const modulo: any = [];
            querySnapshot.forEach((doc) => {
             modulo.push(doc.data());
            });
            setApartament(modulo);
            setIsLoading(false);
           });
       };


  const scrollItens : ScroolItensProps[] = [
    {name: 'Apartamentos',command: getApartamentData},
    {name: 'Insoladas',command: getInsolada},
    {name: 'Geminadas',command: getGeminadas}
    ];

  const handlePress = (index) => {
    setSelectedId(index === selectedId ? null : index); 
  };

  const renderItem = ({ item , index }) => {
    const isSelected = index === selectedId;
    return (
      <TouchableOpacity
      onPress={() => {
        handlePress(index);
        item.command();
      }}
        className={`flex-row items-center mx-2 p-2 rounded-md ${isSelected ? 'bg-[#308DFF]' : 'bg-[#B9B9B9]'}`}
      >
        <Text className={`ml-2 font-regularPopins text-sm ${isSelected ? 'text-[#E5F1FF]' : 'text-[#314865]'}`}>
          {item.name}
        </Text>
      </TouchableOpacity>
      
    );
  };

  const List=()=>{
    return (
        <FlatList
          data={scrollItens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          extraData={selectedId}
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
        />
    )
  }

       React.useEffect(()=>{
        getApartamentData();
        
        },[]);

    return (
        <ScrollView className="Flex-1">
                <View className='flex-1 items-center pt-12 px-4'>
                <Title className="text-[#000929] text-2xl font-semiBoldPopins">Sorteados</Title>
                <Label className="text-[#616161] text-sm text-center pt-2" text='Vizualize o total de sorteados por categoria' />
            </View>
          {apartament.length > 0 &&  <View className="p-2 justify-center items-center bg-[#EEA651] w-12 h-12 rounded-full" style={{position : 'absolute', bottom : 5 ,right : 10, zIndex : 1}}>
            <FontAwesome name="download" size={24} color="black"  onPress={()=>generatePDF(apartament)} />
            </View>}
     <View className="my-4">
     <List />
     </View>
            

    <View className="justify-center items-center ">
    <Search findOne={searchCandidateByName} isLoading={isLoading}/>
   

        {   searchingData.length > 0 ?
        <SearchList candidatos={searchingData} clean={()=>setSearchingData([])} />
        :
        <View className="w-full">
        { apartament.length > 0 ? <SearchList candidatos={apartament} clean={()=>setApartament([])} /> :  <CandidateList />}
                </View>
                }
                </View>
        </ScrollView>

    );
}
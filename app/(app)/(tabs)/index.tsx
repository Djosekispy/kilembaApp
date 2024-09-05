import MyFlatList from '@/components/Flatlist/molecules/flatlist';
import Header from '@/components/HomeHeader/molecules/Header';
import Search from '@/components/HomeHeader/molecules/Search';
import { auth, db } from '@/utils/firebase'
import { signOut } from 'firebase/auth';
import React from 'react';
import { Button, ScrollView} from 'react-native';
import { Text, View } from 'react-native'
import CardOrganism from '@/components/Card/organism/CardOrganism';
import CardList from '@/components/Card/organism/CardFlatlist';
import CandidateList from '@/components/candidateList/organism/CandidateList';
import { UserProps } from '@/interfaces/ICandidate';
import { collection, getDocs, query, where } from 'firebase/firestore';
import SearchList from '@/components/Search/organism/SearchCandidate';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const scrollItens = ['Recomendado','Mais solicitado','Melhor Oferta','Mais accessivéis']

export default function Page() {
  const [searchingData, setSearchingData] = React.useState<UserProps[]>([]);
  const [ isLoading, setIsLoading ] = React.useState(false)
  const handleLogout = async () => {
     await signOut(auth);
  };


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

  
  return (
    <View className='flex-1 relative' >
    <ScrollView className='flex-1' showsVerticalScrollIndicator={false} >
     <View className="justify-center items-center">
      < Header/>
    <Search findOne={searchCandidateByName} isLoading={isLoading}/>

    {   searchingData.length > 0 ?
    <SearchList candidatos={searchingData} clean={()=>setSearchingData([])} />
    :
      <>
      <View className='h-8'>
          <MyFlatList />
            </View>
            <CardList />
            </>
            }
          
            </View>
          
    {searchingData.length < 1  &&  <CandidateList />}
  
    </ScrollView>
    <TouchableOpacity onPress={handleLogout} className='p-2 justify-center items-center bg-[#f8bbd0] rounded-full' style={{position: 'absolute',zIndex: 1, bottom : 20, right : 20}}>
            <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
    </View>
  )
}
import MyFlatList from '@/components/Flatlist/molecules/flatlist';
import Header from '@/components/HomeHeader/molecules/Header';
import Search from '@/components/HomeHeader/molecules/Search';
import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth';
import React from 'react';
import { Button, ScrollView} from 'react-native';
import { Text, View } from 'react-native'
import CardOrganism from '@/components/Card/organism/CardOrganism';
import CardList from '@/components/Card/organism/CardFlatlist';
import CandidateList from '@/components/candidateList/organism/CandidateList';

const scrollItens = ['Recomendado','Mais solicitado','Melhor Oferta','Mais accessivéis']

export default function Page() {
  const [active,setActive ] = React.useState(false)
  const handleLogout = async () => {
     await signOut(auth);
  };
  const findOne = ()=>console.log("Certo certo")

  return (
    <ScrollView className='flex-1' showsVerticalScrollIndicator={false} >
     <View className="justify-center items-center ">
      < Header/>
    <Search findOne={findOne} />

<View className='h-8'>
 <MyFlatList />
  </View>

  <CardList />
  </View>

    <CandidateList />
  

  <Button title="Logout" onPress={handleLogout} />
    

    </ScrollView>
  )
}
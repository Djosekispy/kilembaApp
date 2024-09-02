import MyFlatList from '@/components/Flatlist/molecules/flatlist';
import Header from '@/components/HomeHeader/molecules/Header';
import Search from '@/components/HomeHeader/molecules/Search';
import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth';
import React from 'react';
import { Button} from 'react-native';
import { Text, View } from 'react-native'
import CardOrganism from '@/components/Card/organism/CardOrganism';
import CardList from '@/components/Card/organism/CardFlatlist';

const scrollItens = ['Recomendado','Mais solicitado','Melhor Oferta','Mais accessivéis']

export default function Page() {
  const [active,setActive ] = React.useState(false)
  const handleLogout = async () => {
     await signOut(auth);
  };
  const findOne = ()=>console.log("Certo certo")

  return (
    <View className='flex-1 items-center bg-[#F9FBFF] px-8'>
    < Header/>
    <Search findOne={findOne} />

<View className='h-8'>
 <MyFlatList />
  </View>

  <View className="flex-1 justify-center items-center ">
  <CardList />
  </View>
  <Button title="Logout" onPress={handleLogout} />

    </View>
  )
}
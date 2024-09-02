import React from 'react';
import { ActivityIndicator, FlatList, ImageSourcePropType, View } from 'react-native';
import CardOrganism from './CardOrganism';
import House from '@/interfaces/IHouse';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/utils/firebase';



const CardList: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [house, setHouse] = React.useState<House[]|null>(null)


  const renderItem = ({ item }: { item: House }) => (
    <View className="mb-4">
      <CardOrganism
        imageSource={item.imagem}
        name={item.nome}
        price='Free'
        location='Lubango'
        id={item.id}
      />
    </View>
  );


  const LoadingHousesData = async ()=>{
    const q = query(collection(db, "casas"));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const houseData : House[] = [];
     querySnapshot.forEach((doc) => {
      houseData.push({
        id : doc.id,
      nome: doc.data().nome,
      imagem: doc.data().imagem,
      tipo: doc.data().tipo,
      descricao: doc.data().descricao

      });
      setHouse(houseData);
     });

    })
}


React.useEffect(()=>{
  LoadingHousesData();
},[]);

  return (
    <>
   { house ? <FlatList
      data={house}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
    :
    <ActivityIndicator size={35} color='#308DFF' />
  }
  </>
  );
};

export default CardList;

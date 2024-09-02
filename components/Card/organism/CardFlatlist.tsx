import React from 'react';
import { FlatList, ImageSourcePropType, View } from 'react-native';
import house from '@/assets/images/loginBg.jpg'
import CardOrganism from './CardOrganism';

type CardData = {
  id: string;
  imageSource: ImageSourcePropType;
  name: string;
  price: string;
  location: string;
};

const data: CardData[] = [
  {
    id: '1',
    imageSource: house,
    name: 'Produto 1',
    price: 'R$ 99,99',
    location: 'São Paulo, SP',
  },
  {
    id: '2',
    imageSource: house,
    name: 'Produto 2',
    price: 'R$ 149,99',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: '3',
    imageSource: house,
    name: 'Produto 3',
    price: 'R$ 199,99',
    location: 'Belo Horizonte, MG',
  },
  // Adicione mais itens conforme necessário
];

const CardList: React.FC = () => {
  const renderItem = ({ item }: { item: CardData }) => (
    <View className="mb-4">
      <CardOrganism
        imageSource={item.imageSource}
        name={item.name}
        price={item.price}
        location={item.location}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CardList;

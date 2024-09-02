import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function MyFlatList() {
  const [selectedId, setSelectedId] = useState(null);

  const scrollItens = ['Recomendado', 'Mais solicitado', 'Melhor Oferta', 'Mais acessíveis'];

  const handlePress = (index) => {
    setSelectedId(index === selectedId ? null : index); 
  };

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedId;
    return (
      <TouchableOpacity
        onPress={() => handlePress(index)}
        className={`flex-row items-center mx-2 px-4 rounded-md ${isSelected ? 'bg-[#308DFF]' : 'bg-[#F1F2F4]'}`}
      >
        <Text className={`ml-2 font-semiBoldPopins ${isSelected ? 'text-[#E5F1FF]' : 'text-[#314865]'}`}>
          {item.toString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={scrollItens}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      extraData={selectedId}
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
    />
  );
}

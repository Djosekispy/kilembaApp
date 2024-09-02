import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LocationMolecule from '@/components/Card/molecules/Location';
import HouseAtom from '../atoms/house';
import FullScreenImage from './FullScreenImage';

type CandidateListItemProps = {
  nome: string;
  tipo: string;
  endereco: string;
  imagem: string;
};

const CandidateListItem: React.FC<CandidateListItemProps> = ({ nome, tipo, endereco, imagem }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
const onClose = () => setIsFullScreen(false)
  return (
    <View className="flex-row p-2 bg-white rounded-md shadow-sm">
      <TouchableOpacity onPress={() => setIsFullScreen(true)}>
        <Image 
          source={{ uri: imagem }} 
          className="w-20 h-20 rounded-full mr-8"
        />
      </TouchableOpacity>
      
      <View className="flex-col justify-center">
        <Text className="font-semiBoldPopins text-lg">{nome}</Text>
        <HouseAtom address={tipo} />
        <LocationMolecule location={endereco} />
      </View>

      <FullScreenImage 
        isVisible={isFullScreen} 
        imageUri={imagem} 
        onClose={() => setIsFullScreen(false)} 
      />
    </View>
  );
};

export default CandidateListItem;

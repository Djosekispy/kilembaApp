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
          className="w-14 h-14 rounded-full mr-8"
        />
      </TouchableOpacity>
      
      <View className="flex-col justify-center ">
        <Text  className="font-regularPopins text-md text-ellipsis overflow-hidden" 
        numberOfLines={1} 
        ellipsizeMode="tail">{nome}</Text>
          <HouseAtom address={tipo} />
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

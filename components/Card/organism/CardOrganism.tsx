import Label from '@/components/Form/atoms/Label';
import React, { useState } from 'react';
import { ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import LocationMolecule from '../molecules/Location';
import IconAtom from '../Atoms/IconAtom';
import ImageAtom from '@/components/Modal/atoms/Image';
import { Link } from 'expo-router';

type CardOrganismProps = {
  id: string;
  imageSource: string;
  name: string;
  price: string;
  location: string;
};

const CardOrganism: React.FC<CardOrganismProps> = ({ id, imageSource, name, price, location }) => {
  const [isRated, setIsRated] = useState(false);

  return (
    <View className="bg-white rounded-lg p-2 ml-4">
       
        <View className='w-60 h-40 rounded-md'>
        <ImageAtom className='w-full h-full rounded-md' source={imageSource} />
        </View>
      <View className="mt-4">
      <Link href={`/(app)/(main)/${id}`}>
        <Label text={name} className="font-semiBoldPopins text-md pb-1" />
        </Link>
        <Label text={price} className="text-[#0066FF] font-regularPopins text-sm" />
        <LocationMolecule location={location} />
      </View>
      <IconAtom
        name="star"
        className='absolute right-0 bottom-3'
        color={isRated ? '#0066FF' : '#B9B9B9'}
        size={24}
        onPress={() => setIsRated(!isRated)}
      />
    
    </View>
  );
};

export default CardOrganism;

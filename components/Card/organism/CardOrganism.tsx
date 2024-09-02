import Label from '@/components/Form/atoms/Label';
import React, { useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import LocationMolecule from '../molecules/Location';
import IconAtom from '../Atoms/IconAtom';
import ImageAtom from '@/components/Modal/atoms/Image';

type CardOrganismProps = {
  imageSource: ImageSourcePropType;
  name: string;
  price: string;
  location: string;
};

const CardOrganism: React.FC<CardOrganismProps> = ({ imageSource, name, price, location }) => {
  const [isRated, setIsRated] = useState(false);

  return (
    <View className="bg-white rounded-lg p-2 ml-4">
        <View className='w-60 h-40 rounded-md'>
    
        <ImageAtom className='w-full h-full rounded-md' source={imageSource} />
        </View>
      <View className="mt-4">
        <Label text={name} className="font-semiBoldPopins text-lg" />
        <Label text={price} className="text-[#0066FF] font-regularPopins mt-1" />
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

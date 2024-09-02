import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Label from '@/components/Form/atoms/Label';

type LocationMoleculeProps = {
  location: string;
};

const LocationMolecule: React.FC<LocationMoleculeProps> = ({ location }) => (
  <View className="flex-row items-center mt-1">
    <MaterialCommunityIcons name="map-marker" size={16} color="#B9B9B9" />
    <Label text={location} className="ml-1 text-[#B9B9B9]"/>
  </View>
);

export default LocationMolecule;

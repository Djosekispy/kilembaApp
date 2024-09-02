import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconAtomProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap ;
  color: string;
  size: number;
  className: string;
  onPress: () => void;
};

const IconAtom: React.FC<IconAtomProps> = ({ name, color, size, onPress,className,...rest }) => (
  <TouchableOpacity onPress={onPress} className={className } {...rest}>
    <MaterialCommunityIcons name={name} color={color} size={size} />
  </TouchableOpacity>
);

export default IconAtom;

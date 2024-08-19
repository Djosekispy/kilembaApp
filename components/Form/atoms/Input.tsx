import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import tw from 'twrnc';

interface InputProps extends TextInputProps {
  className?: string;
  iconName?: keyof typeof AntDesign.glyphMap; 
}

const Input: React.FC<InputProps> = ({ className, iconName, ...props }) => (
  
  <View style={tw.style(`relative ${className || ''}`)}>
    {iconName && (
      <AntDesign
        name={iconName}
        size={30}
        color="#FFFFF"
        style={tw.style('absolute left-3 top-2 z-10 ')}
      />
    )}

    <TextInput
      style={tw.style(`pl-10 bg-white p-2 rounded ${className || ''}`)} 
      {...props}
    />

  </View>
);

export default Input;

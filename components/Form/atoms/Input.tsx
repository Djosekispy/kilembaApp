import { AntDesign } from '@expo/vector-icons';
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
        color="#000"
        style={tw.style('absolute left-5 top-2 ')}
      />
    )}
    <TextInput
      style={tw.style(`pl-10 bg-white p-2 rounded ${className || ''}`)} 
      {...props}
    />
  </View>
);

export default Input;

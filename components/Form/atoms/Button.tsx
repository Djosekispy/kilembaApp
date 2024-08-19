import React from 'react';
import { Button, View } from 'react-native';
import tw from 'twrnc';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, className, ...props }) => (
  <View style={tw.style(`${className || ''} mt-10 bg-pink-500 rounded`)}  {...props}>
    <Button title={title} onPress={onPress} color="#fff" />
  </View>
);

export default CustomButton;

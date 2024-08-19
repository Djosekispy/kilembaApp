import React from 'react';
import { TouchableOpacity, Button, View, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Label from './Label';

interface CustomButtonProps {
  title: string;
  isLoading: boolean;
  onPress: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title,isLoading, onPress, className, ...props }) => (
  <View style={tw.style('mt-10 bg-pink-500 rounded h-12')}  {...props}>
    <TouchableOpacity onPress={onPress} disabled={isLoading}>
     { isLoading ? <ActivityIndicator color='#FFFFFF' size={35}/> : <Label text={title} className='text-[#FFFFFF] font-semiBoldPopins text-lg' />}
    </TouchableOpacity>
  </View>
);

export default CustomButton;

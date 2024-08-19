import React from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';

interface LabelProps {
  text: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text, className, ...props }) => (
  <Text style={tw.style(`${className || ''} text-white mb-5`)}  {...props}>
    {text}
  </Text>
);

export default Label;

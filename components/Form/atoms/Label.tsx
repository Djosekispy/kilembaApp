import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import tw from 'twrnc';

interface LabelProps extends TextProps {  
  text: string;
  className?: string;
}

const Label = forwardRef<Text, LabelProps>(({ text, className, ...props }, ref) => (
  <Text ref={ref} style={tw.style(`${className || ''} text-white mb-5`)} {...props}>
    {text}
  </Text>
));

export default Label;

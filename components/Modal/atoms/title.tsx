import React from "react";
import { Text } from "react-native";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ children, className , ...rest}) => {
  return <Text className={`text-xl font-bold ${className}`} {...rest}>{children}</Text>;
};

export default Title;

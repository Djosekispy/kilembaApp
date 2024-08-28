import React from "react";
import { View } from "react-native";
import { ImageSourcePropType } from "react-native";
import ImageAtom from "../atoms/Image";
import Title from "../atoms/title";

type ModalHeaderProps = {
  title: string;
  imageSource: ImageSourcePropType;
  className?: string;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, imageSource, className }) => {
  return (
    <View className={`flex-col items-center ${className}`}>
      <View className="w-44 h-44">
      <ImageAtom source={imageSource} className="w-full h-full" />
      </View>
      <Title className="text-3xl font-semiBoldPopins">{title}</Title>
    </View>
  );
};

export default ModalHeader;

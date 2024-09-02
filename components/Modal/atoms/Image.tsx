import React from "react";
import { Image, ImageSourcePropType } from "react-native";

type ImageAtomProps = {
  source?: string;
  className?: string;
};

const ImageAtom: React.FC<ImageAtomProps> = ({ source, className, ...rest }) => {
  return <Image source={{uri: source}} className={className} {...rest} resizeMode="contain"/>;
};

export default ImageAtom;

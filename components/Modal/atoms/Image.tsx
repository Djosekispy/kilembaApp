import React from "react";
import { Image, ImageSourcePropType } from "react-native";

type ImageAtomProps = {
  source?: ImageSourcePropType;
  className?: string;
};

const ImageAtom: React.FC<ImageAtomProps> = ({ source, className, ...rest }) => {
  return <Image source={source} className={className} {...rest} resizeMode="cover"/>;
};

export default ImageAtom;

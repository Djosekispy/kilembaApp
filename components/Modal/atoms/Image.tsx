import React from "react";
import { Image, ImageResizeMode, ImageSourcePropType } from "react-native";

type ImageAtomProps = {
  source?: string;
  className?: string;
  resize?: ImageResizeMode;
};

const ImageAtom: React.FC<ImageAtomProps> = ({ resize,source, className, ...rest }) => {
  return <Image source={{uri: source}} className={className} {...rest} resizeMode={resize ? resize : "contain"}/>;
};


export default ImageAtom;

import { AntDesign } from "@expo/vector-icons";
import { TextInputProps, View } from "react-native";

interface InputPropsMaterilIocons extends TextInputProps {
    className?: string;
    iconName?: keyof typeof AntDesign.glyphMap 
  }
export default function IconButtom( { className, iconName} : InputPropsMaterilIocons){

    return (
        <View
        className={className}
        >
      <AntDesign
        name={iconName}
        size={35}
        color="#FFFFF"
      />
        </View>
    );
}
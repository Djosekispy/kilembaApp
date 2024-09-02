import Label from "@/components/Form/atoms/Label";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

type HouseAtomProps = {
    address: string;
    className ? : string;
  };

  const HouseAtom: React.FC<HouseAtomProps> = ({ address,  className , ...rest }) => (
    <View className={`flex-row items-center mt-1 ${className}`} {...rest}>
      <MaterialCommunityIcons name="hoop-house" size={16} color="#B9B9B9" />
      <Label text={address} className="ml-1 text-[#B9B9B9]"/>
    </View>);

export default HouseAtom;
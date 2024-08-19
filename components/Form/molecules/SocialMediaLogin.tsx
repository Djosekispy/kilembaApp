import { View } from "react-native";
import Label from "../atoms/Label";
import {MaterialCommunityIcons} from '@expo/vector-icons';



 function SocialMediaLogin(){
    return (
        <View className="justify-center items-center pt-12">
         <Label text='continuar com ' className='text-[#FFFF] font-mediumPopins text-sm ' />
         <View className='flex-row gap-2 pt-6'>
         <MaterialCommunityIcons
            name="google"
            size={30}
            />
            
            <MaterialCommunityIcons
            name="apple"
            size={30}
            />
            
            <MaterialCommunityIcons
            name="facebook"
            size={30}
            />
         
          
         </View>
        </View>
    );
}


export default SocialMediaLogin;
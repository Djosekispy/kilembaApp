import React from "react";
import { useSignIn } from '@clerk/clerk-expo';
import { View } from "react-native";
import Label from "../atoms/Label";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import { ActivityIndicator } from "react-native";

interface signInFuctions {
  SignInWithGoole? : ()=>void;
  isLoading ? : boolean
}

function SocialMediaLogin({ SignInWithGoole, isLoading  } :signInFuctions) {


  return (
    <View className="justify-center items-center pt-12">
      <Label text="Continuar com" className="text-[#FFFF] font-mediumPopins text-sm" />
 
      { isLoading ? 
      <ActivityIndicator size={30} color='red' />
      :
      <View className="flex-row gap-2 pt-6">
        <MaterialCommunityIcons
          name="google"
          size={30}
          onPress={SignInWithGoole}

        />
        <MaterialCommunityIcons
          name="apple"
          size={30}
        />
        <MaterialCommunityIcons
          name="facebook"
          size={30}
       
        />
      </View>}
    </View>
  );
}

export default SocialMediaLogin;

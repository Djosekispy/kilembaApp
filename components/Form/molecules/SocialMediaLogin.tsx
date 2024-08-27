import React from "react";
import { View } from "react-native";
import Label from "../atoms/Label";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { getAuth, signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";

function SocialMediaLogin() {
  const [requestGoogle, responseGoogle, promptGoogle] = Google.useAuthRequest({
    
   clientId:"877784344083-7kb7melrve6uk07cjtvk8lrqgk2b5v8p.apps.googleusercontent.com"
  });

  const [requestFacebook, responseFacebook, promptFacebook] = Facebook.useAuthRequest({
    clientId: 'YOUR_FACEBOOK_APP_ID',
  });

  React.useEffect(() => {
    if (responseGoogle?.type === 'success') {
      const { id_token } = responseGoogle.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(error => {
        console.error('Error during Google login:', error);
      });
    }
  }, [responseGoogle]);

  React.useEffect(() => {
    if (responseFacebook?.type === 'success') {
      const { access_token } = responseFacebook.params;

      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential).catch(error => {
        console.error('Error during Facebook login:', error);
      });
    }
  }, [responseFacebook]);

  return (
    <View className="justify-center items-center pt-12">
      <Label text="Continuar com" className="text-[#FFFF] font-mediumPopins text-sm" />
      <View className="flex-row gap-2 pt-6">
        <MaterialCommunityIcons
          name="google"
          size={30}
          onPress={() => promptGoogle()}
        />
        <MaterialCommunityIcons
          name="apple"
          size={30}
        />
        <MaterialCommunityIcons
          name="facebook"
          size={30}
          onPress={() => promptFacebook()}
        />
      </View>
    </View>
  );
}

export default SocialMediaLogin;

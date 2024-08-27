import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { Slot, useRouter } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    regularPopins:  require('../assets/fonts/Poppins-Regular.ttf'),
    mediumPopins:  require('../assets/fonts/Poppins-Medium.ttf'),
    semiBoldPopins:  require('../assets/fonts/Poppins-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function InitialLayout(){

  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    }); 
    return () => unsubscribe();
  }, []);

  useEffect(()=>{

    if(user){
      router.replace('/(app)/(tabs)/')
    }else{
      router.replace('/(app)/(auth)/')
    }
  },[user])

  return  <Slot />
}

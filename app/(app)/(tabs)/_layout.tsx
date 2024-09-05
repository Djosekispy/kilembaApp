import React, { Suspense, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {StatusBar} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { auth } from '@/utils/firebase';




export default function TabLayout() {
  const userRole = auth?.currentUser?.email;
  
  return (
    <>
    <StatusBar networkActivityIndicatorVisible={true} translucent={true} barStyle='dark-content'/>
       
    <Tabs

      screenOptions={{
       headerShown: false,
      tabBarActiveTintColor: '#01579b',
      tabBarInactiveBackgroundColor:'#FFF',
      tabBarActiveBackgroundColor:'#cfd8dc',
     tabBarStyle:{
      marginTop:0
     }
      }}
     
      >
         <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size}  name="home" color={color} />,
        }}
      />
        <Tabs.Screen
        name="subscribe"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size} name="user" color={color} />,
        }}
      />
   
          <Tabs.Screen
            name="painel"
            options={{
              title: '',
              tabBarIcon: ({ color, size }) => <MaterialIcons name="admin-panel-settings" size={size} color={color} />,
            }}
          />
      
         <Tabs.Screen
        name="selected"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <Feather name="paperclip"  size={size} color={color}/> ,
        }}
      />
  </Tabs>
    </>
  );
}

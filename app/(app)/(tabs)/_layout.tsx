import React, { Suspense, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {StatusBar} from 'react-native';



function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} {...props} />;
}

export default function TabLayout() {
 
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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
        <Tabs.Screen
        name="subscribe"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
  </Tabs>
    </>
  );
}

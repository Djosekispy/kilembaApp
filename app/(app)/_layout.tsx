
import { Stack } from 'expo-router'
import React, { Suspense, useEffect } from 'react'


export default function EntryLayout() {


  return (
     <Stack screenOptions={{headerShown: false}}>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>      
  )
}

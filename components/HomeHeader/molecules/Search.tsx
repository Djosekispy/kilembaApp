import { InputMaterialIcons } from '@/components/Form/atoms/Input';
import React from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';
import IconButtom from '../atoms/IconButtom';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface ISearch {
    findOne : (text: string)=>void
    isLoading: boolean
}

export default function Search({ findOne , isLoading}: ISearch) {
  const [query, setQuery] = React.useState('');

  return (
    <View className="flex-row shrink-0 mt-4">
      <View className="w-72 py-2 relative">
      <MaterialCommunityIcons
          name="magnify"
          size={35}
          color="#95A2B0"
         style={{
            position:'absolute',
            top: 16,
            left: 2,
            zIndex:1
         }}
        />
        <TextInput
          className="w-full h-12 pl-12 pr-4 shadow-md rounded-md bg-white text-[#95A2B0]"
          placeholder="Faça sua busca"
          placeholderTextColor="#95A2B0"
          onChangeText={(text) => setQuery(text)}
        />
       
      </View>
      <View className="flex justify-center items-center p-2">
        <View className="rounded-md bg-[#308DFF] p-2">
            <TouchableOpacity onPress={()=>findOne(query)} disabled={isLoading}>
        { isLoading ? 
        <ActivityIndicator size={35} color={'#FFF'} />
        : <IconButtom
            iconName="filter"
            className="rounded-md text-white"
          />
          
          }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

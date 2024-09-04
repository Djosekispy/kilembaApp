import Label from "@/components/Form/atoms/Label";
import ImageAtom from "@/components/Modal/atoms/Image";
import Title from "@/components/Modal/atoms/title";
import { CandidateForm, schemaCandidate } from "@/interfaces/ICandidate";
import { auth, db, storage } from "@/utils/firebase";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Dropdown  from "../molecules/SelectInput";
import Checkbox from 'expo-checkbox';
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CandidateProps from "@/interfaces/ICandidateData";
import { Input } from "@/components/Form/atoms/Input";


export default function AlradyCandidated({estado,nome,telefone,endereco,bilhete,certificado,residencia,numeroBi,tipo,data,perfilUrl} : CandidateProps){

    const user = auth.currentUser;
    const urlAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s'
  


    return (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="flex-1 items-center pt-12">
              <Title className="text-[#000929] text-2xl font-semiBoldPopins">Ficha de Candidatura</Title>

              <Label text="
                 Sua candidatura já foi submetida com sucesso, aguarde 
                 próximas actualizações.
                 " 
              className="text-[#616161] text-sm text-center pt-2"
              />
              <View className="w-24 h-24 rounded-full mt-8">
                <TouchableOpacity disabled={false}>
                <ImageAtom className="w-24 h-24 rounded-full" resize="cover" source={perfilUrl || user?.photoURL || urlAvatar} />
                </TouchableOpacity>
              </View>
              <View className='flex-row items-end my-2 p-2 rounded-md bg-[#B9B9B9]'>
                            <Label text={`Estado da Candidatura : ${estado}` || 'Estado desconhecido'} className="ml-1 text-[#478FF1] font-regularPopins" />
                        </View>
              <View className="w-full px-4">
                
              <View className="mb-4">
    <Label text={'Nome Completo'} className='mb-2 text-[#000] font-regularPopins text-sm' />
              <Input
          value={nome}
          className='"mb-4 border h-12 rounded-lg  pl-12 text-black'
          iconName={'user'}
          editable={false}
        />
  </View>

  <View className="mb-4">
    <Label text={'Telefone'} className='mb-2 text-[#000] font-regularPopins text-sm' />
              <Input
          value={telefone}
          className='"mb-4 border h-12 rounded-lg  pl-12 text-black'
          iconName={'phone'}
          editable={false}
        />
  </View>

  <View className="mb-4">
    <Label text={'Endereço'} className='mb-2 text-[#000] font-regularPopins text-sm' />
              <Input
          value={endereco}
          className='"mb-4 border h-12 rounded-lg  pl-12 text-black'
          iconName={'home'}
          editable={false}
        />
  </View>
        
  <View className="mb-4">
    <Label text={'Número de BI'} className='mb-2 text-[#000] font-regularPopins text-sm' />
              <Input
          value={numeroBi}
          className='"mb-2 border h-12 rounded-lg  pl-12 text-black'
          iconName={'circledown'}
          editable={false}
        />
  </View>


<Dropdown onSelect={()=>alert('Já definido')} value={tipo} disabled={true} />

<View className="flex-row justify-evenly items-center">
    
    <View className="items-center">
    <TouchableOpacity className={`items-center`} disabled={true}>
   <Entypo name="v-card" size={40} color={"#246BFD"} />
   <Label text="Bilhete" className="font-regularPopins text-sm"/>
    </TouchableOpacity>
    </View> 

    <View className="items-center">
    <TouchableOpacity className="items-center"  disabled={true} >
    <MaterialCommunityIcons name="certificate" size={40} color={"#246BFD"} />
   <Label text="Certificado" className="font-regularPopins text-sm"/>
   </TouchableOpacity>
    </View> 

    <View className="items-center">  
    <TouchableOpacity className="items-center" disabled={true}>
<Feather name="clipboard" size={40} color={"#246BFD"} />
   <Label text="At. Residência" className="font-regularPopins text-sm"/>
   </TouchableOpacity>
    </View> 
</View>

<View className='flex-row gap-4 mt-2'>
        <Checkbox
          value={true}
          disabled={true}
          color={'#4630EB'}
        />
        <Label text='Li e concordo com os Termos e Condições' className="underline" />
      </View>
      <Label text='* Seus dados pessoais são importantes, porfavor não partilhe com nínguém!' className="text-red-950 my-4" />
              </View>
            </View>
        </ScrollView>
      
    );
}
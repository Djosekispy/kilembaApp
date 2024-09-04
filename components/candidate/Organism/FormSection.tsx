import Label from "@/components/Form/atoms/Label";
import ImageAtom from "@/components/Modal/atoms/Image";
import Title from "@/components/Modal/atoms/title";
import { CandidateForm, schemaCandidate } from "@/interfaces/ICandidate";
import { auth, db, storage } from "@/utils/firebase";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from 'react-hook-form';
import React from "react";
import FormField from "@/components/Form/molecules/FormField";
import CustomButton from "@/components/Form/atoms/Button";
import Dropdown  from "../molecules/SelectInput";
import Checkbox from 'expo-checkbox';
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import TermsModal from "../molecules/term";
import {
    doc,
    setDoc,
    addDoc,
    serverTimestamp,
    collection,
    where,
    query,
    onSnapshot
  } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, StorageReference, FirebaseStorage, uploadBytesResumable } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import CandidateProps from "@/interfaces/ICandidateData";
import { decode } from 'base64-arraybuffer';
import AlradyCandidated from "./RegistredCandidate";

export default function Candiating(){
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<CandidateForm>({
        resolver: yupResolver(schemaCandidate),
      })
    const user = auth.currentUser;
    const urlAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s'
    const [error, setError] = React.useState('')
    const [value, setValue] = React.useState('')
    const [isChecked, setChecked] = React.useState(false);
    const [ visible, setVisible ] = React.useState(false)
    const [ candidate, setCandidate] = React.useState<CandidateProps[] | null>(null)
    const [bilheteFile, setBilheteFile] = React.useState('')
    const [certificadoFile, setCertificadoFile ] = React.useState('')
    const [residenciaFile, setResidenciaFile] = React.useState('')
    const [profileFile, setProfileFile] = React.useState('')
      const getAdmin = auth?.currentUser?.email;
     getAdmin === 'globof129@gmail.com'
      
    const [ isLoading , setIsLoading ] = React.useState(false)



      const PickerFiles = async (destiny: string, command : any) => {
        const result = await DocumentPicker.getDocumentAsync({
          type: ['application/pdf','image/jpeg','image/png','image/jpg'],
        });
      
        if (!result.canceled) {
          try {
              setIsLoading(true);
              const file = result.assets[0];
              const uniqueName = `${new Date().toISOString()}-${file.name}`;
              const path = `uploads/${destiny}/${uniqueName}`;
              const fileRef = ref(storage, path);

              // Ler o arquivo como um blob
              const response = await fetch(file.uri);
              const blob = await response.blob();

              // Fazer upload do arquivo para o Firebase Storage
              await uploadBytes(fileRef, blob, {
                contentType: file.mimeType, // Define o tipo de conteúdo do arquivo
              });
              
              // Obter a URL de download do arquivo
      const downloadURL = await getDownloadURL(fileRef);
      
             command(downloadURL);
          } catch (err) {
            console.log(err);
          }finally{
            setIsLoading(false);
          }
        }
      };

      const PickerImage = async (destiny: string, command : any) => {
        const result = await DocumentPicker.getDocumentAsync({
          type: ['image/jpeg','image/png','image/jpg'],
        });
      
        if (!result.canceled) {
          try {
              setIsLoading(true);
              const file = result.assets[0];
              const uniqueName = `${new Date().toISOString()}-${file.name}`;
              const path = `uploads/${destiny}/${uniqueName}`;
              const fileRef = ref(storage, path);

              // Ler o arquivo como um blob
              const response = await fetch(file.uri);
              const blob = await response.blob();

              // Fazer upload do arquivo para o Firebase Storage
              await uploadBytes(fileRef, blob, {
                contentType: file.mimeType, // Define o tipo de conteúdo do arquivo
              });
              
              // Obter a URL de download do arquivo
      const downloadURL = await getDownloadURL(fileRef);
      
             command(downloadURL);
          } catch (err) {
            console.log(err);
          }finally{
            setIsLoading(false);
          }
        }
      };

    const onSubmit = async (data : CandidateForm) => {
        setIsLoading(true);
    try{
      if(!bilheteFile || !certificadoFile || !residenciaFile || !value){
        alert('Carregue os arquivos e selecione o tipo de imovél');
        setIsLoading(false);
        return;
      }
      await addDoc(collection(db, 'candidatos'), {
        nome: data.nome,
        telefone: data.telefone,
        endereco: data.endereco,
        email: auth?.currentUser?.email,
        referencia: auth?.currentUser?.uid,
        bilhete: bilheteFile,
        certificado: certificadoFile,
        residencia: residenciaFile,
        numeroBi:data.numeroBi,
        tipo: value,
        sorteado: false,
        estado: 'pendente',
        perfilUrl : profileFile,
        data: serverTimestamp()
      });
    }catch(err){
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
        
    };
  
 
  const verifyCadidate = ()=>{
    const q = query(collection(db, "candidatos"),where('referencia','==',auth?.currentUser?.uid));
    const unsubscribeData = onSnapshot(q, (querySnapshot) => {
       const modulo: any[] = [];
       querySnapshot.forEach((doc) => {
        modulo.push(doc.data());
       });
  setCandidate(modulo);
      });
  }
  
  React.useEffect(()=>{
    verifyCadidate();
  },[])

    return (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          
 {  getAdmin !== 'globof129@gmail.com' &&         <>
         { candidate && candidate?.length > 0 ?
        ( <AlradyCandidated
          estado={candidate[0].estado}
          nome={candidate[0].nome}
          telefone={candidate[0].telefone}
          endereco={candidate[0].endereco}
          bilhete={candidate[0].bilhete}
          certificado={candidate[0].certificado}
          residencia={candidate[0].residencia}
          numeroBi={candidate[0].numeroBi}
          tipo={candidate[0].tipo}
          data={candidate[0].data}
          perfilUrl={candidate[0].perfilUrl}
           />)
         :   (<>
         <TermsModal visible={visible} onClose={()=>setVisible(false)} />
              <View className="flex-1 items-center pt-12">
              <Title className="text-[#000929] text-2xl font-semiBoldPopins">Ficha de Candidatura</Title>
              <Label text="
                 Preencha todos os campos do formulário para poder
              participar do sorteio em data anunciar." 
              className="text-[#616161] text-sm text-center pt-2"
              />
              
              <View className="w-24 h-24 rounded-full mt-8">
                <TouchableOpacity disabled={false} onPress={()=>PickerImage('Perfil',setProfileFile)}>
                <ImageAtom className="w-24 h-24 rounded-full" resize="cover" source={profileFile ||user?.photoURL || urlAvatar} />
                </TouchableOpacity>
              </View>
              <View className="w-full px-4">
              { error && <Label text={error} className='text-[#fc2d2d]  rounded-xl font-semiBoldPopins text-sm text-center py-2' />}
            
     <FormField
       control={control}
       secure={false}
       name="nome"
       rules={{ required: true }}
       label="Nome Completo"
       boardType='email-address'
       labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
       inputClassName={errors.nome ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d] bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
       icon='user'
     />

<FormField
       control={control}
       secure={false}
       name="telefone"
       rules={{ required: true }}
       label="Telefone"
       boardType='number-pad'
       labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
       inputClassName={errors.nome ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d] bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
       icon='phone'
     />

<FormField
       control={control}
       secure={false}
       name="endereco"
       rules={{ required: true }}
       label="Endereço"
      boardType='default'
       labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
       inputClassName={errors.nome ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d]  bg-[#6A6A6A]  pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
       icon='home'
     />
     <FormField
       control={control}
       secure={false}
       name="numeroBi"
       rules={{ required: true }}
       label="Número de BI"
       boardType='default'
       labelClassName="mb-2 text-[#000] font-regularPopins text-sm"
       inputClassName={errors.nome ? "mb-2 border-2 h-12 rounded-md border-[#fc2d2d]  bg-[#6A6A6A]  pl-12" :"mb-2 border h-12 rounded-lg bg-[#6A6A6A]  focus:bg-[#FFFFFF] pl-12"}
       icon='circledown'
     />

<Dropdown onSelect={setValue} value={value}/>

<View className="flex-row justify-evenly items-center">
    
    <View className="items-center">
    <TouchableOpacity className={`items-center`} onPress={()=>PickerFiles('Bilhete',setBilheteFile)}>
   <Entypo name="v-card" size={40} color={bilheteFile ? "#246BFD":"#616161"} />
   <Label text="Bilhete" className="font-regularPopins text-sm"/>
    </TouchableOpacity>
    </View> 

    <View className="items-center">
    <TouchableOpacity className="items-center" onPress={()=>PickerFiles('Certificado',setCertificadoFile)}>
    <MaterialCommunityIcons name="certificate" size={40} color={certificadoFile ? "#246BFD":"#616161"} />
   <Label text="Certificado" className="font-regularPopins text-sm"/>
   </TouchableOpacity>
    </View> 

    <View className="items-center">  
    <TouchableOpacity className="items-center"  onPress={()=>PickerFiles('Residencia',setResidenciaFile)}>
<Feather name="clipboard" size={40} color={residenciaFile ? "#246BFD":"#616161"} />
   <Label text="At. Residência" className="font-regularPopins text-sm"/>
   </TouchableOpacity>
    </View> 
</View>

<View className='flex-row gap-4 mt-2'>
        <Checkbox
          
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Label text='Li e concordo com os Termos e Condições' className="underline" onPress={()=>setVisible(true)} />
      </View>

<CustomButton
      isLoading={isLoading}
       title="Submeter Candidatura" 
       className='rounded-full bg-[#000] mt-12 h-12 justify-center items-center'
       onPress={handleSubmit(onSubmit)} 
       />
              </View>





            </View>
            </>
          )
            }
</>
}
      <View className="flex-1 justify-center items-center pt-64">
      <Title className="text-[#000929] text-2xl font-semiBoldPopins">Ficha de Candidatura</Title>
        <Label text='Área reservada apenas para Candidatos' className='text-[#8C8C8C] text-lg' />
      </View>
        </ScrollView>
      
    );
}
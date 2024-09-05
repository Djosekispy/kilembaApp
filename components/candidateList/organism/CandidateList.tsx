import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from '@/utils/firebase';
import { updateDocument } from '../atoms/updateDocument';
import CandidateListItem from '../molecules/CandidateListItem';
import DocumentActions from '../molecules/DocumentActions';
import { UserProps } from '@/interfaces/ICandidate';



const CandidateList: React.FC = () => {
  const user = auth.currentUser;
  const urlAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s'
  
  const [candidatos, setCandidatos] = useState<UserProps[]>([]);

  const getAdmin = auth?.currentUser?.email;

  useEffect(() => {
    const q = query(collection(db, "candidatos"));
    const unsubscribeData = onSnapshot(q, (querySnapshot) => {
      const modulo: UserProps[] = [];
      querySnapshot.forEach((doc) => {
        modulo.push({
          id: doc.id,
          nome: doc.data().nome,
          telefone: doc.data().telefone,
          endereco: doc.data().endereco,
          bilhete: doc.data().bilhete,
          certificado: doc.data().certificado,
          residencia: doc.data().residencia,
          tipo: doc.data().tipo,
          estado: doc.data().estado,
          perfilUrl: doc.data().perfilUrl
        });
      });
      setCandidatos(modulo);
    });
    return () => unsubscribeData();
  }, []);



  const aprovarCandidato = async (documentId: string) => {
    const updatedData = { estado: 'aprovado' };
    await updateDocument('candidatos', documentId, updatedData);
  };

  const reprovadarCandidato = async (documentId: string) => {
    const updatedData = { estado: 'reprovado' };
    await updateDocument('candidatos', documentId, updatedData);
  };

  const renderItem = ({ item }: { item: UserProps }) => (
    <View className="mb-2">
      <CandidateListItem
        endereco={item.endereco}
        nome={item.nome}
        tipo={item.tipo}
        imagem={item.perfilUrl || urlAvatar}
      />
      {getAdmin === 'globof129@gmail.com' && item.estado === "pendente" && (
        <>
          <DocumentActions
            bilhete={item.bilhete}
            residencia={item.residencia}
            certificado={item.certificado}
          />
          <View className="flex-row justify-around  mt-2">
            <TouchableOpacity className='w-32 bg-[#8694A6] justify-center items-center p-2 rounded-md' onPress={() => aprovarCandidato(item.id)}>
              <Text className="text-[#2A2B3F]">Aprovar</Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-2 w-32 bg-[#8C8C8C] justify-center items-center rounded-md' onPress={() => reprovadarCandidato(item.id)}>
              <Text className="text-red-500">Rejeitar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View className="p-2">
     <View className='flex-row justify-between mb-1'>
     <Text className="text-xl font-bold text-[#122D4D]"> Candidatos</Text>
     <Text className="text-sm font-semiBoldPopins text-[#989898] "> Total : {candidatos.length} </Text>
     </View>
      <FlatList
        data={candidatos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text className="text-center text-gray-500">Não Há cadastro</Text>}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CandidateList;

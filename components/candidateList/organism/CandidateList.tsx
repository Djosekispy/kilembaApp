import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from '@/utils/firebase';
import { updateDocument } from '../atoms/updateDocument';
import CandidateListItem from '../molecules/CandidateListItem';
import DocumentActions from '../molecules/DocumentActions';


type UserProps = {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  bilhete: string;
  certificado: string;
  residencia: string;
  tipo: string;
  estado: string;
}

const CandidateList: React.FC = () => {
  const [candidatos, setCandidatos] = useState<UserProps[]>([]);
  const [nome, setNome] = useState('');
  const [dadosBuscados, setDadosBuscados] = useState<UserProps[]>([]);

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
          estado: doc.data().estado
        });
      });
      setCandidatos(modulo);
    });
    return () => unsubscribeData();
  }, []);

  const Pesquisar = (nome: string) => {
    if (nome !== '') {
      const busca = candidatos.filter(item => item.nome.toLowerCase().startsWith(nome.toLowerCase()));
      setDadosBuscados(busca);
    } else {
      setDadosBuscados(candidatos);
    }
  };

  const aprovarCandidato = async (documentId: string) => {
    const updatedData = { estado: 'aprovado' };
    await updateDocument('candidatos', documentId, updatedData);
  };

  const reprovadarCandidato = async (documentId: string) => {
    const updatedData = { estado: 'reprovado' };
    await updateDocument('candidatos', documentId, updatedData);
  };

  const renderItem = ({ item }: { item: UserProps }) => (
    <View className="mb-4">
      <CandidateListItem
        endereco={item.endereco}
        nome={item.nome}
        tipo={item.tipo}
        imagem='https://avatars.githubusercontent.com/u/123516423?v=4'
      />
      {getAdmin === 'globof129@gmail.com' && item.estado === "pendente" && (
        <>
          <DocumentActions
            bilhete={item.bilhete}
            residencia={item.residencia}
            certificado={item.certificado}
          />
          <View className="flex-row justify-around mt-2">
            <TouchableOpacity onPress={() => aprovarCandidato(item.id)}>
              <Text className="text-green-500">Aprovar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => reprovadarCandidato(item.id)}>
              <Text className="text-red-500">Rejeitar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View className="p-4">
     <View className='flex-row justify-between mb-4'>
     <Text className="text-xl font-bold text-[#122D4D]"> Candidatos</Text>
     <Text className="text-sm font-semiBoldPopins text-[#989898] "> Mais </Text>
     </View>
      <FlatList
        data={nome && dadosBuscados.length > 0 ? dadosBuscados : candidatos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text className="text-center text-gray-500">Não Há cadastro</Text>}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CandidateList;

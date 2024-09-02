import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

type DocumentActionsProps = {
  bilhete: string;
  residencia: string;
  certificado: string;
};

const DocumentActions: React.FC<DocumentActionsProps> = ({ bilhete, residencia, certificado }) => {
  return (
    <View className="flex-row justify-between mt-2">
      <TouchableOpacity onPress={() => console.log('Ver bilhete')}>
        <Ionicons name="document-text-outline" size={30} color="#FF0000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Ver residência')}>
        <Ionicons name="home-outline" size={30} color="#FF0000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Ver certificado')}>
        <Ionicons name="ribbon-outline" size={30} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentActions;

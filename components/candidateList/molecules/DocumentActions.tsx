import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
type DocumentActionsProps = {
  bilhete: string;
  residencia: string;
  certificado: string;
};

const DocumentActions: React.FC<DocumentActionsProps> = ({ bilhete, residencia, certificado }) => {
  const openDocument = async (url: string) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  console.log(bilhete)
  return (
    <View className="flex-row justify-evenly mt-2">
      <TouchableOpacity onPress={() => openDocument(bilhete)}>
        <Ionicons name="document-text-outline" size={30} color="#8694A6" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openDocument(residencia)}>
        <Ionicons name="home-outline" size={30} color="#8694A6" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openDocument(certificado)}>
        <Ionicons name="ribbon-outline" size={30} color="#8694A6" />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentActions;

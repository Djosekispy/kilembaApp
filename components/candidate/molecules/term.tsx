import React from 'react';
import { Modal, Text, View, ScrollView, TouchableOpacity } from 'react-native';


interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
        <View className='bg-white rounded-lg p-4 w-11/12 max-h-3/4'>
          <Text className='text-xl font-bold mb-4 text-center'>Termos e Condições</Text>
          <ScrollView className='mb-4'>
            <Text className='mb-2'>
              1. Cada participante pode inscrever-se apenas uma vez no sorteio. Participações múltiplas resultarão em desqualificação.
            </Text>
            <Text className='mb-2'>
              2. É obrigatório fornecer informações corretas e precisas. Informações incorretas ou incompletas poderão invalidar sua participação.
            </Text>
            <Text className='mb-2'>
              3. Após a inscrição, o participante deve aguardar a divulgação dos resultados. Não será permitido modificar a inscrição após o envio.
            </Text>
            <Text className='mb-2'>
              4. O participante deve respeitar o prazo de reclamações, que será definido e divulgado junto com os resultados. Reclamações fora do prazo não serão consideradas.
            </Text>
            <Text className='mb-2'>
              5. Os organizadores do sorteio reservam-se o direito de desqualificar qualquer participante que viole os termos e condições.
            </Text>
            <Text className='mb-2' >
              6. Os resultados do sorteio são finais e não sujeitos a revisões ou apelações.
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            className=' bg-[#000] py-2 rounded-lg items-center'
          >
            <Text className='text-white text-lg font-semiBoldPopins'>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TermsModal;

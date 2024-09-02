import React from 'react';
import { Modal, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FullScreenImageProps = {
  isVisible: boolean;
  imageUri: string;
  onClose: () => void;
};

const FullScreenImage: React.FC<FullScreenImageProps> = ({ isVisible, imageUri, onClose }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPressOut={onClose}
        className="flex-1 justify-center items-center bg-black"
      >
        <TouchableWithoutFeedback>
          <View className="relative">
            <TouchableOpacity className="absolute top-8 right-8 z-10" onPress={onClose}>
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: imageUri }}
              style={{ width: width, height: height, resizeMode: 'contain' }}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default FullScreenImage;

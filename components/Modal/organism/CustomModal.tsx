import React from "react";
import { ImageSourcePropType, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import ModalHeader from "../molecules/ModalHeader";
import { Button } from "react-native";
import CustomButton from "@/components/Form/atoms/Button";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  imageSource: string;
  children: React.ReactNode;
  className?: string;
};

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, title, imageSource, children, className, ...rest }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide"  onDismiss={onClose}>
       <TouchableOpacity
        style={{ flex: 1}}
        onPressOut={onClose} 
         className="flex-1 justify-center items-center backdrop-opacity-10 backdrop-invert bg-black/30 "
      >
    <TouchableWithoutFeedback>
            <View className={`bg-white py-6 rounded-3xl ${className}`}>
              <ModalHeader title={title} imageSource={imageSource} />
              <View className="items-center">{children}</View>
            </View>
 </TouchableWithoutFeedback>
      </TouchableOpacity>
     
    </Modal>
  );
};

export default CustomModal;

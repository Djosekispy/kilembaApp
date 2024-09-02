import { ImageSourcePropType } from "react-native";

interface House {
        id: string;
        nome: string;
        tipo: string;
        descricao: string;
        imagem: ImageSourcePropType;
      
}

export default House;
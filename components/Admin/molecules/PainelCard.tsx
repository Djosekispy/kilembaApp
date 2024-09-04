import React from 'react';
import { View, Text } from 'react-native';

type PainelProps = {
  tipo: string;
  total: number;
  porcentagem: string;
};

export default function PainelCard({ tipo, total, porcentagem }: PainelProps) {
  return (
    <View className="m-4 p-5 h-24 w-24 justify-center items-center rounded-full" style={{ backgroundColor: '#EEA651' }}>
        <Text className="text-white text-md font-regularPopins mt-1"> {porcentagem}%</Text>
    </View>
  );
}

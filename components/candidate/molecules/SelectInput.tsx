import React from 'react';
import { View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface DropdownProps {
  value: string;
  disabled? : boolean;
  onSelect: (selectedValue: string) => void;
}

const propertyOptions = [
  { title: 'Apartamentos', icon: 'home-outline' },
  { title: 'Vivendas Geminadas', icon: 'home-group' },
  { title: 'Vivendas Insoladas', icon: 'home-city-outline' },
];

const Dropdown: React.FC<DropdownProps> = ({ value, onSelect,disabled }) => {
  return (
    <SelectDropdown
    disabled={disabled ? disabled : false}
      data={propertyOptions}
      onSelect={(selectedItem) => onSelect(selectedItem.title)}
      renderButton={(selectedItem, isOpened) => (
        <View className="w-60 h-12 bg-gray-200 rounded-lg flex-row justify-center items-center px-3">
          <View className='flex-row gap-4 pt-4'>
          {selectedItem && (
            <Icon name={selectedItem.icon} className="text-2xl mr-2" size={24} />
          )}
          <Text className="flex-1 text-md font-regularPopins text-gray-800">
            {(selectedItem && selectedItem.title) || value || 'Selecione o tipo de imóvel'}
          </Text>

          </View>

          <Icon size={25} name={isOpened ? 'chevron-up' : 'chevron-down'} className="text-2xl" />
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View
          className={`w-full  ${isSelected ? 'bg-gray-300' : ''}`}
        >
            <View className='flex-row gap-4 py-4'>
            <Icon name={item.icon} size={25} className="text-2xl mr-2" />
            <Text className="text-md  font-regularPopins text-gray-800 mb-2">
            {item.title}
          </Text>
            </View>
         
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        paddingHorizontal: 10,
      }}
    />
  );
};

export default Dropdown;

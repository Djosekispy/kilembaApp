import { auth } from '@/utils/firebase'
import { signOut } from 'firebase/auth';
import { Button } from 'react-native';
import { Text, View } from 'react-native'

export default function Page() {
  const handleLogout = async () => {
     await signOut(auth);
  };
  

  return (
    <View className='flex-1 justify-center items-center'>
    <Text> Home - {auth.currentUser?.email}</Text>
    <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}
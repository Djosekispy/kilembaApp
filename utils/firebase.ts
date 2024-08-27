import { getStorage } from "firebase/storage";
import Config from 'react-native-config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBsQ3339Z_UadiOsKsPGdOp0LHEuMqsOEU",
  authDomain: "kilemba-df33a.firebaseapp.com",
  projectId: "kilemba-df33a",
  storageBucket: "kilemba-df33a.appspot.com",
  messagingSenderId: "877784344083",
  appId: "1:877784344083:web:da5492792babbf52f3c1e6"
};

const app = initializeApp(firebaseConfig);
  
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  const db = getFirestore(app); 
  
  const storage = getStorage(app);
  
export { db, auth, storage }
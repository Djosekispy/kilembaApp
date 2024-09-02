import { db } from '@/utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateDocument = async (collectionName: string, documentId: string, updatedData: any) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, updatedData);
};

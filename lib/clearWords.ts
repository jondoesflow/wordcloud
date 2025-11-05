'use client';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function clearAllWords() {
  try {
    const wordsRef = collection(db, 'words');
    const wordsSnapshot = await getDocs(wordsRef);
    const deletePromises = wordsSnapshot.docs.map((wordDoc) => 
      deleteDoc(doc(db, 'words', wordDoc.id))
    );
    await Promise.all(deletePromises);
    return { success: true };
  } catch (error) {
    console.error('Error clearing words:', error);
    return { success: false, error: 'Failed to clear words' };
  }
}

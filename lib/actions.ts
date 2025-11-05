'use server';

import { db } from './firebase';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';

export async function submitWord(word: string) {
  try {
    const wordsRef = collection(db, 'words');
    await addDoc(wordsRef, {
      text: word.toLowerCase().trim(),
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting word:', error);
    return { success: false, error: 'Failed to submit word' };
  }
}

export async function updateQuestion(question: string) {
  try {
    const settingsRef = doc(db, 'settings', 'current');
    await setDoc(settingsRef, {
      currentQuestion: question,
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error updating question:', error);
    return { success: false, error: 'Failed to update question' };
  }
}

export async function getCurrentQuestion() {
  try {
    const settingsRef = doc(db, 'settings', 'current');
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return { success: true, question: settingsSnap.data().currentQuestion || '' };
    }
    return { success: true, question: '' };
  } catch (error) {
    console.error('Error getting question:', error);
    return { success: false, error: 'Failed to get question', question: '' };
  }
}

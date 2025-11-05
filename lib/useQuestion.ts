'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export function useQuestion() {
  const [question, setQuestion] = useState<string>('');

  useEffect(() => {
    const settingsRef = doc(db, 'settings', 'current');

    const unsubscribe = onSnapshot(settingsRef, (doc) => {
      if (doc.exists()) {
        setQuestion(doc.data().currentQuestion || '');
      }
    });

    return () => unsubscribe();
  }, []);

  return question;
}

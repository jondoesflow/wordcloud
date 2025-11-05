'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface Word {
  id: string;
  text: string;
  createdAt: any;
}

export interface WordFrequency {
  text: string;
  value: number;
}

export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [wordFrequencies, setWordFrequencies] = useState<WordFrequency[]>([]);

  useEffect(() => {
    const wordsRef = collection(db, 'words');
    const q = query(wordsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wordsData: Word[] = [];
      snapshot.forEach((doc) => {
        wordsData.push({
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
        });
      });
      setWords(wordsData);

      // Calculate word frequencies
      const frequencyMap = new Map<string, number>();
      wordsData.forEach((word) => {
        const count = frequencyMap.get(word.text) || 0;
        frequencyMap.set(word.text, count + 1);
      });

      const frequencies: WordFrequency[] = Array.from(frequencyMap.entries()).map(
        ([text, value]) => ({ text, value })
      );
      setWordFrequencies(frequencies);
    });

    return () => unsubscribe();
  }, []);

  return { words, wordFrequencies };
}

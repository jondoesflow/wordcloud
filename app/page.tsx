'use client';

import { useState } from 'react';
import { submitWord } from '@/lib/actions';
import { useWords } from '@/lib/useWords';
import { useQuestion } from '@/lib/useQuestion';
import WordCloud from '@/components/WordCloud';
import { QRCodeSVG } from 'qrcode.react';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  const [word, setWord] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const question = useQuestion();
  const { wordFrequencies } = useWords();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsSubmitting(true);
    await submitWord(word);
    setWord('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8 transition-colors">
      <DarkModeToggle />
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-gray-100 dark:border-gray-700 transition-colors">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-center leading-tight">
            {question || 'Loading question...'}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter your word or phrase"
              className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg transition-all bg-white dark:bg-gray-700"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !word.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none whitespace-nowrap"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 text-center">
            Live Word Cloud
          </h2>
          {wordFrequencies.length > 0 ? (
            <WordCloud words={wordFrequencies} />
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-500 py-16 sm:py-24 md:py-32 text-base sm:text-lg">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">💭</div>
              No words submitted yet. Be the first to submit!
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">Scan to visit this site</p>
          <QRCodeSVG 
            value="https://wordcloudjdr.netlify.app"
            size={100}
            level="M"
            className="border-4 border-white dark:border-gray-700 shadow-md"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">wordcloudjdr.netlify.app</p>
        </div>
      </div>
    </div>
  );
}

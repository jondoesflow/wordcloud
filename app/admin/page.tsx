'use client';

import { useState } from 'react';
import { updateQuestion } from '@/lib/actions';
import { clearAllWords } from '@/lib/clearWords';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function AdminPage() {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // First clear all existing words
    const clearResult = await clearAllWords();
    if (!clearResult.success) {
      setMessage('Failed to clear existing words');
      setIsSubmitting(false);
      return;
    }

    // Then update the question
    const result = await updateQuestion(question);

    if (result.success) {
      setMessage('Question updated successfully!');
      setQuestion('');
    } else {
      setMessage('Failed to update question');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <DarkModeToggle />
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-2xl border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⚙️</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Admin Panel
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">Set the question for word cloud submissions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
              Current Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question for word cloud submissions"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg transition-all bg-white dark:bg-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none text-base sm:text-lg"
          >
            {isSubmitting ? 'Saving...' : 'Save Question'}
          </button>

          {message && (
            <div className={`text-center p-3 sm:p-4 rounded-xl ${message.includes('success') ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
              <p className="font-medium text-sm sm:text-base">{message}</p>
            </div>
          )}
        </form>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <a 
            href="/" 
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center gap-2 transition-colors text-sm sm:text-base"
          >
            ← Back to Word Cloud
          </a>
        </div>
      </div>
    </div>
  );
}

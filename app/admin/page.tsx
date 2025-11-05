'use client';

import { useState } from 'react';
import { updateQuestion } from '@/lib/actions';
import { clearAllWords } from '@/lib/clearWords';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">⚙️</div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-2">Set the question for word cloud submissions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-3">
              Current Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question for word cloud submissions"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-800 placeholder-gray-400 text-lg transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none text-lg"
          >
            {isSubmitting ? 'Saving...' : 'Save Question'}
          </button>

          {message && (
            <div className={`text-center p-4 rounded-xl ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              <p className="font-medium">{message}</p>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <a 
            href="/" 
            className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2 transition-colors"
          >
            ← Back to Word Cloud
          </a>
        </div>
      </div>
    </div>
  );
}

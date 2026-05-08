'use client';

import React, { useState } from 'react';

export default function CoreRunPage() {
  const [copied, setCopied] = useState(false);

  const postContent = `Day 1

Book: Magic of Thinking Big
- Successful people specialize in retrieving only positive thoughts from their memory bank
- To think confidently, act confidently.

Audio: Manny and Candace Winston
- Action Precedes Motivation

Stop waiting for the "perfect" moment or a burst of inspiration to get started. Motivation typically comes after you start doing the work, not before. Just like hitting the gym, you might have to force yourself to show up, but it is the "reps" themselves that generate the excitement to reach the next step.

Remember that action is the ultimate cure for fear, and once you start moving, the momentum will follow.`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(postContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Text Message Posting Format</h1>
          <p className="text-lg text-slate-600">
            Daily accountability post to your coach on business education takeaways
          </p>
        </div>

        {/* Example Post */}
        <div className="bg-white rounded-lg shadow-md p-8 border-t-4 relative">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="Copy post"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-600 font-medium">Copied</span>
              </>
            ) : (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          <h2 className="text-2xl font-bold text-slate-900 mb-6">Day 1</h2>

          {/* Book Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Book: Magic of Thinking Big</h3>
            <ul className="space-y-2 ml-6">
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">-</span>
                <span className="text-slate-700">
                  Successful people specialize in retrieving only positive thoughts from their memory bank
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">-</span>
                <span className="text-slate-700">
                  To think confidently, act confidently.
                </span>
              </li>
            </ul>
          </div>

          {/* Audio Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Audio: Manny and Candace Winston</h3>
            <ul className="space-y-2 ml-6">
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold flex-shrink-0">-</span>
                <span className="text-slate-700">
                  Action Precedes Motivation — Stop waiting for the "perfect" moment or a burst of inspiration to get started. Motivation typically comes after you start doing the work, not before. Just like hitting the gym, you might have to force yourself to show up, but it is the "reps" themselves that generate the excitement to reach the next step. Remember that action is the ultimate cure for fear, and once you start moving, the momentum will follow.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';

export default function CoreRunPage() {
  const [copied, setCopied] = useState(false);

  const postData = {
    day: "Day 1",
    sections: [
      {
        title: "Book: Magic of Thinking Big",
        items: [
          "Successful people specialize in retrieving only positive thoughts from their memory bank",
          "To think confidently, act confidently."
        ]
      },
      {
        title: "Audio: Manny and Candace Winston",
        items: [
          "Action Precedes Motivation. Stop waiting for the \"perfect\" moment or a burst of inspiration to get started.",
          "Consistency creates confidence. The more you show up and execute, the more capable and powerful you feel, which in turn fuels further action."
        ],
      }
    ]
  };

  const generatePostText = () => {
    let text = `${postData.day}\n\n`;
    postData.sections.forEach(section => {
      text += `${section.title}\n`;
      section.items.forEach(item => {
        text += `- ${item}\n`;
      });
      text += `\n`;
    });
    return text.trim();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatePostText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-none p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Text Message Posting Format</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Daily accountability post to your coach on business education takeaways
          </p>
        </div>

        {/* Example Post */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border-t-4 relative">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
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
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{postData.day}</h2>
          {postData.sections.map((section, idx) => (
            <div key={idx} className={idx < postData.sections.length - 1 ? "mb-5" : ""}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">{section.title}</h3>
              <ul className="space-y-1.5 ml-5 mb-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-indigo-600 font-bold flex-shrink-0">-</span>
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

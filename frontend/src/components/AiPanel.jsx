import { useState } from "react";
import { askAI } from "../services/api";

export default function AiPanel({ recordId = null }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const data = await askAI(question, recordId);
      setResponse(data);
    } catch (err) {
      setError("AI service is unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    handleAsk();
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h2 className="text-lg font-semibold text-[#1B4F8A]">Ask AI</h2>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask a compliance question..."
          className="flex-1 border border-blue-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-white"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            "Ask AI"
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-3 text-sm text-gray-500 bg-white rounded-lg p-4 border border-blue-100">
          <svg className="animate-spin w-5 h-5 text-[#1B4F8A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          AI is analysing your question...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
          <button
            onClick={handleRetry}
            className="text-sm text-[#1B4F8A] font-medium hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      )}

      {/* AI Response Card */}
      {response && !loading && (
        <div className="bg-white border border-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-[#1B4F8A] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#1B4F8A]">AI Response</span>
            {response.meta?.cached && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Cached</span>
            )}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {response.answer || response.result || JSON.stringify(response)}
          </p>
          {response.sources && response.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">Sources</p>
              {response.sources.map((source, i) => (
                <p key={i} className="text-xs text-gray-400">• {source}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
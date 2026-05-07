import { useState } from "react";

export default function StreamingReport() {
  const [report, setReport] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const startReport = () => {
    setReport("");
    setDone(false);
    setError(null);
    setStreaming(true);

    try {
      const es = new EventSource(
        `${import.meta.env.VITE_AI_URL}/generate-report`
      );

      es.onmessage = (event) => {
        setReport((prev) => prev + event.data);
      };

      es.onerror = () => {
        es.close();
        setStreaming(false);
        setDone(true);
        if (!report) {
          setError("Report generation failed. AI service may be unavailable.");
        }
      };

      es.addEventListener("done", () => {
        es.close();
        setStreaming(false);
        setDone(true);
      });
    } catch (err) {
      setError("Failed to connect to AI service.");
      setStreaming(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-700">AI Compliance Report</h2>
        </div>
        <button
          onClick={startReport}
          disabled={streaming}
          className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
        >
          {streaming ? (
            <>
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate Report"
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {(report || streaming) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-32">
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {report}
            {streaming && (
              <span className="inline-block w-2 h-4 bg-[#1B4F8A] ml-1 animate-pulse" />
            )}
          </p>
        </div>
      )}

      {done && report && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => {
              const blob = new Blob([report], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "compliance-report.txt";
              a.click();
            }}
            className="text-sm text-[#1B4F8A] hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Report
          </button>
        </div>
      )}
    </div>
  );
}
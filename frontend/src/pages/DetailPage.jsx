import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecordById, deleteRecord } from "../services/api";
import AiPanel from "../components/AiPanel";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const data = await fetchRecordById(id);
        setRecord(data);
      } catch (err) {
        // Demo data when backend not ready
        setRecord({
          id: id,
          name: "Access Control Policy",
          status: "COMPLIANT",
          description: "This control ensures that access to information and information processing facilities is restricted based on business and security requirements.",
          createdDate: "2026-04-14",
          lastModifiedDate: "2026-04-20",
          score: 85,
          aiAnalysis: "This record shows strong compliance with ISO 27001 access control requirements. Recommended actions include periodic review of access rights and implementation of multi-factor authentication.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadRecord();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setDeleting(true);
    try {
      await deleteRecord(id);
      navigate("/records");
    } catch (err) {
      alert("Failed to delete record. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      COMPLIANT: "bg-green-100 text-green-700 border border-green-200",
      NON_COMPLIANT: "bg-red-100 text-red-700 border border-red-200",
      IN_PROGRESS: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      PENDING: "bg-gray-100 text-gray-700 border border-gray-200",
    };
    return styles[status] || styles.PENDING;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/records")}
        className="flex items-center gap-2 text-[#1B4F8A] text-sm mb-6 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Records
      </button>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{record.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Record ID: {record.id}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit/${record.id}`)}
            className="px-4 py-2 bg-[#1B4F8A] text-white rounded-lg text-sm font-medium hover:bg-blue-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Record Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Status</p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
              {record.status}
            </span>
          </div>

          {record.score !== undefined && (
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Compliance Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(record.score)}`}>
                {record.score}%
              </p>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Created Date</p>
            <p className="text-sm text-gray-700">{record.createdDate}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Last Modified</p>
            <p className="text-sm text-gray-700">{record.lastModifiedDate}</p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-gray-500 font-medium mb-1">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{record.description}</p>
          </div>
        </div>
      </div>

      {/* AI Analysis Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h2 className="text-lg font-semibold text-[#1B4F8A]">AI Analysis</h2>
        </div>
        {record.aiAnalysis ? (
          <p className="text-sm text-gray-700 leading-relaxed">{record.aiAnalysis}</p>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            AI analysis is being generated...
          </div>
        )}
      </div>
      <AiPanel recordId={record.id} />
    </div>
  );
}
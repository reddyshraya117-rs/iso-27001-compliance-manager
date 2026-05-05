import { useEffect, useState } from "react";
import { fetchAllRecords } from "../services/api";

export default function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchAllRecords();
        setData(result.content || []);
      } catch (err) {
        setError("Failed to load records.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 font-medium">{error}</div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-xl font-semibold">No records found</p>
        <p className="text-sm mt-2">Create your first record to get started.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#1B4F8A]">
        ISO 27001 Compliance Records
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{record.id}</td>
                <td className="px-4 py-3 text-sm">{record.name}</td>
                <td className="px-4 py-3 text-sm">{record.status}</td>
                <td className="px-4 py-3 text-sm">{record.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
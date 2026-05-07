import { useEffect, useState } from "react";
import { fetchAllRecords, exportCSV } from "../services/api";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchAllRecords(
        page, 10, sortBy, sortDir,
        filters.search, filters.status,
        filters.startDate, filters.endDate
      );
      setData(result.content || []);
      setTotalPages(result.totalPages || 0);
    } catch (err) {
      setError("Failed to load records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, sortBy, sortDir, filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await exportCSV();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compliance-records.csv";
      a.click();
    } catch (err) {
      alert("Export failed. Backend not ready yet.");
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <span className="ml-1 text-gray-300">↕</span>;
    return <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  if (error) {
    return <div className="p-6 text-red-500 font-medium">{error}</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#1B4F8A]">
          ISO 27001 Compliance Records
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="border border-[#1B4F8A] text-[#1B4F8A] px-4 py-2 rounded hover:bg-blue-50 text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={() => navigate("/create")}
            className="bg-[#1B4F8A] text-white px-4 py-2 rounded hover:bg-blue-800 text-sm"
          >
            + Create Record
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <SearchBar onFilter={handleFilter} />

      {/* Loading */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-xl font-semibold">No records found</p>
          <p className="text-sm mt-2">Try adjusting your filters or create a new record.</p>
          <button
            onClick={() => navigate("/create")}
            className="mt-4 bg-[#1B4F8A] text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Create Record
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200" onClick={() => handleSort("id")}>
                    ID <SortIcon column="id" />
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200" onClick={() => handleSort("name")}>
                    Name <SortIcon column="name" />
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200" onClick={() => handleSort("status")}>
                    Status <SortIcon column="status" />
                  </th>
                  <th className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200" onClick={() => handleSort("createdDate")}>
                    Created Date <SortIcon column="createdDate" />
                  </th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((record) => (
                  <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{record.id}</td>
                    <td
                      className="px-4 py-3 text-sm text-[#1B4F8A] cursor-pointer hover:underline"
                      onClick={() => navigate(`/records/${record.id}`)}
                    >
                      {record.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.status === "COMPLIANT" ? "bg-green-100 text-green-700" :
                        record.status === "NON_COMPLIANT" ? "bg-red-100 text-red-700" :
                        record.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{record.createdDate}</td>
                    <td className="px-4 py-3 text-sm flex gap-2">
                      <button
                        onClick={() => navigate(`/records/${record.id}`)}
                        className="text-[#1B4F8A] hover:underline text-xs font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/edit/${record.id}`)}
                        className="text-gray-500 hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Page {page + 1} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
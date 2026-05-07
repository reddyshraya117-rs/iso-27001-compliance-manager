import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setStats({
      total: 30,
      compliant: 12,
      nonCompliant: 8,
      inProgress: 7,
      pending: 3,
      byStatus: [
        { status: "Compliant", count: 12 },
        { status: "Non Compliant", count: 8 },
        { status: "In Progress", count: 7 },
        { status: "Pending", count: 3 },
      ],
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      label: "Total Records",
      value: stats.total,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-[#1B4F8A]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Compliant",
      value: stats.compliant,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Non Compliant",
      value: stats.nonCompliant,
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4F8A]">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">ISO 27001 Compliance Overview</p>
        </div>
        <button
          onClick={() => navigate("/create")}
          className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm font-medium"
        >
          + Create Record
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((card) => (
          <div key={card.label} className={`border rounded-xl p-4 ${card.color} flex items-center gap-4`}>
            <div className="p-2 bg-white rounded-lg shadow-sm">{card.icon}</div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Records by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.byStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1B4F8A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate("/records")}
          className="px-4 py-2 border border-[#1B4F8A] text-[#1B4F8A] rounded-lg text-sm hover:bg-blue-50"
        >
          View All Records
        </button>
        <button
          onClick={() => navigate("/analytics")}
          className="px-4 py-2 border border-[#1B4F8A] text-[#1B4F8A] rounded-lg text-sm hover:bg-blue-50"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
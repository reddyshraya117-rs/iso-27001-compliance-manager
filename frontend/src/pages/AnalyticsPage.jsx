import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie,
  Cell, Legend,
} from "recharts";

const COLORS = ["#1B4F8A", "#ef4444", "#f59e0b", "#6b7280"];

const demoData = {
  "3months": {
    total: 18,
    compliant: 8,
    nonCompliant: 4,
    inProgress: 4,
    pending: 2,
    byStatus: [
      { status: "Compliant", count: 8 },
      { status: "Non Compliant", count: 4 },
      { status: "In Progress", count: 4 },
      { status: "Pending", count: 2 },
    ],
    overTime: [
      { month: "Feb", records: 6 },
      { month: "Mar", records: 12 },
      { month: "Apr", records: 18 },
    ],
  },
  "6months": {
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
    overTime: [
      { month: "Nov", records: 3 },
      { month: "Dec", records: 5 },
      { month: "Jan", records: 8 },
      { month: "Feb", records: 12 },
      { month: "Mar", records: 18 },
      { month: "Apr", records: 30 },
    ],
  },
  "1year": {
    total: 45,
    compliant: 20,
    nonCompliant: 10,
    inProgress: 9,
    pending: 6,
    byStatus: [
      { status: "Compliant", count: 20 },
      { status: "Non Compliant", count: 10 },
      { status: "In Progress", count: 9 },
      { status: "Pending", count: 6 },
    ],
    overTime: [
      { month: "May", records: 2 },
      { month: "Jun", records: 5 },
      { month: "Jul", records: 8 },
      { month: "Aug", records: 12 },
      { month: "Sep", records: 16 },
      { month: "Oct", records: 20 },
      { month: "Nov", records: 25 },
      { month: "Dec", records: 28 },
      { month: "Jan", records: 32 },
      { month: "Feb", records: 36 },
      { month: "Mar", records: 41 },
      { month: "Apr", records: 45 },
    ],
  },
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState(demoData["6months"]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("6months");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats(demoData[period]);
      setLoading(false);
    }, 300);
  }, [period]);

  const pieData = stats.byStatus.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const summaryCards = [
    { label: "Total Records", value: stats.total, color: "text-[#1B4F8A]", bg: "bg-blue-50 border-blue-200" },
    { label: "Compliant", value: stats.compliant, color: "text-green-700", bg: "bg-green-50 border-green-200" },
    { label: "Non Compliant", value: stats.nonCompliant, color: "text-red-700", bg: "bg-red-50 border-red-200" },
    { label: "In Progress", value: stats.inProgress, color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4F8A]">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Compliance trends and insights</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last 1 Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.label} className={`border rounded-xl p-4 ${card.bg}`}>
            <p className="text-xs text-gray-500 font-medium">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      ) : (
        <>
          {/* Bar and Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* Bar Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Records by Status</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.byStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1B4F8A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Status Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Records Over Time
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.overTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="records"
                  stroke="#1B4F8A"
                  strokeWidth={2}
                  dot={{ fill: "#1B4F8A" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
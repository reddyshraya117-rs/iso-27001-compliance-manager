import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie,
  Cell, Legend,
} from "recharts";

const COLORS = ["#1B4F8A", "#ef4444", "#f59e0b", "#6b7280"];

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("6months");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
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
          overTime: [
            { month: "Nov", records: 3 },
            { month: "Dec", records: 5 },
            { month: "Jan", records: 8 },
            { month: "Feb", records: 12 },
            { month: "Mar", records: 18 },
            { month: "Apr", records: 30 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [period]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const pieData = stats.byStatus.map((item) => ({
    name: item.status,
    value: item.count,
  }));

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

      {/* Charts Grid */}
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Records Over Time</h2>
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
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
import Navbar from '../components/Navbar'

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <p className="text-gray-500">KPI cards and charts — to be implemented on Day 6</p>
      </main>
    </>
  )
}
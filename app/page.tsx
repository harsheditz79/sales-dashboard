import { SalesChart } from '@/components/organisms/SalesChart';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Sales Dashboard</h1>
        <SalesChart />
      </div>
    </main>
  );
}
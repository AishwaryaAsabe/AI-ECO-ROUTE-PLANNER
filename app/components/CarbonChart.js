import { useEffect } from 'react';

export default function CarbonChart() {
  useEffect(() => {
    // Initialize chart here (e.g., using Chart.js, Recharts)
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-lg font-semibold">Carbon Savings Chart</h3>
      {/* Chart will be displayed here */}
    </div>
  );
}

"use client";
import { useEffect, useState } from 'react';

export default function VehicleSelector({ selectedVehicle, setVehicle }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch available vehicles from the API
    const fetchVehicles = async () => {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  return (
    <select
      value={selectedVehicle}
      onChange={(e) => setVehicle(e.target.value)}
      className="border p-2 rounded mb-2 w-full"
    >
      <option value="">Select Vehicle</option>
      {vehicles.map((vehicle) => (
        <option key={vehicle._id} value={vehicle._id}>
          {vehicle.type} - {vehicle.fuelType}
        </option>
      ))}
    </select>
  );
}

"use client" ;
import { useState } from 'react';

export default function VehicleForm() {
  const [vehicle, setVehicle] = useState({ type: '', fuelType: '', capacity: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the vehicle data to the API
    const res = await fetch('/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });
    const data = await res.json();
    console.log(data);
    // Reset the form or show a success message
    setVehicle({ type: '', fuelType: '', capacity: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Add Vehicle</h3>
      <input
        type="text"
        placeholder="Vehicle Type"
        value={vehicle.type}
        onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Fuel Type"
        value={vehicle.fuelType}
        onChange={(e) => setVehicle({ ...vehicle, fuelType: e.target.value })}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Capacity"
        value={vehicle.capacity}
        onChange={(e) => setVehicle({ ...vehicle, capacity: e.target.value })}
        className="border p-2 rounded mb-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Vehicle</button>
    </form>
  );
}

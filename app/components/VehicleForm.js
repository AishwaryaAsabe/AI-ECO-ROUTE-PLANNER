"use client";
import { useState, useEffect } from 'react';

export default function VehicleForm() {
  const [vehicle, setVehicle] = useState({ type: '', fuelType: '', capacity: '' });
  const [driverId, setDriverId] = useState(null); // Add state for driverId



  useEffect(() => {
    // Get the driverId from localStorage
    const storedDriverId = localStorage.getItem('userId');
    if (storedDriverId) {
      setDriverId(storedDriverId);
    }
  }, []); 
   // Empty dependency array to run this effect only on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert capacity to a number
    const payload = { 
      ...vehicle, 
      driverId, 
      capacity: Number(vehicle.capacity) // Ensure capacity is a number
    };
  
    // Validate input
    if (!payload.type || !payload.fuelType || !payload.capacity || !payload.driverId) {
      alert('Please fill out all fields');
      return;
    }
  
    // Log the payload for debugging
    console.log('Payload to be sent:', payload);
  
    // Submit the vehicle data to the API
    const res = await fetch('/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      console.error('Error response:', errorData); // Log the error
      alert(errorData.error || 'An error occurred');
    } else {
      const data = await res.json();
      console.log('Response from server:', data);
      setVehicle({ type: '', fuelType: '', capacity: '' }); // Reset form
    }
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
        onChange={(e) => setVehicle({ ...vehicle, capacity: parseInt(e.target.value) || '' })} // Parse to int
        className="border p-2 rounded mb-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Vehicle</button>
    </form>
  );
}

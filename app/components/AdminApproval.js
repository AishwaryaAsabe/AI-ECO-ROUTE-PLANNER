"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminApproval() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminComments, setAdminComments] = useState(''); // State for comments

  // Fetch all pending vehicles
  useEffect(() => {
    const fetchPendingVehicles = async () => {
      try {
        const response = await axios.get('/api/vehicles');
        setVehicles(response.data); // Assuming response.data contains an array of vehicles
      } catch (err) {
        console.error(err.response || err.message); // More detailed error message
        setError(err.response ? err.response.data.error : err.message);
     }
      finally {
        setLoading(false);
      }
    };

    fetchPendingVehicles();
  }, []);

  // Handle vehicle approval or rejection
  const handleApproval = async (vehicleId, isApproved) => {
    try {
      // Send vehicle ID, approval status, and admin comments to the API
      await axios.post('/api/admin/approval', { vehicleId, isApproved, adminComments });

      if (isApproved) {
        console.log('Vehicle approved');
      } else {
        console.log('Vehicle rejected');
      }
  
      // Update the UI by removing the approved/rejected vehicle
      setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== vehicleId));
  
      // Clear comments after approval/rejection
      setAdminComments(''); 
      console.log("vehicle updated successfully")
    } catch (err) {
      console.error(err.response || err.message); // More detailed error message
      setError(err.response ? err.response.data.error : err.message);
    }
  };
  

  if (loading) return <p className="text-center text-xl">Loading vehicles...</p>; // Loading state

  if (error) return <p className="text-center text-red-500">{error}</p>; // Error handling

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Pending Vehicles for Approval</h1>
      {vehicles.length === 0 ? (
        <p className="text-center">No pending vehicles.</p>
      ) : (
        <ul className="space-y-4">
          {vehicles.map((vehicle) => (
            <li key={vehicle._id} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold">{vehicle.type}</h3>
              <p>Fuel Type: <span className="font-medium">{vehicle.fuelType}</span></p>
              <p>Capacity: <span className="font-medium">{vehicle.capacity}</span></p>
              <label className="block mt-3">Admin Comments:</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                value={adminComments}
                onChange={(e) => setAdminComments(e.target.value)} // Update comments state
                placeholder="Enter comments here..."
              />
              <div className="flex justify-between">
                <button
                  onClick={() => handleApproval(vehicle._id, true)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(vehicle._id, false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

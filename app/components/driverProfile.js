"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios here


export default function DriverProfile() {
  const [driverData, setDriverData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchDriverProfile = async () => {
      const driverId = localStorage.getItem('userId'); // Fetch driverId from localStorage
      if (!driverId) {
        setError('Driver ID is not available');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`/api/drivers/profile?driverId=${driverId}`);
        if (response.status === 200) {
          setDriverData(response.data);
          setFormData({ ...response.data });
        } else {
          setError('Driver not found');
          console.log('Driver not found');
        }
      } catch (error) {
        console.error('Error fetching driver profile:', error);
        if (error.response) {
          setError(error.response.data.error || 'Failed to load driver profile');
        } else {
          setError('Failed to load driver profile');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchDriverProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const driverId = localStorage.getItem("userId"); // Assuming driverId is still available here

    try {
      const response = await axios.put(`/api/drivers/profile?driverId=${driverId}`, formData);
      if (response.status === 200) {
        setDriverData(response.data);
        setFormData(response.data);
        setIsEditing(false); // Exit edit mode after successful update
      }
    } catch (error) {
      console.error("Error updating driver profile:", error);
      setError("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  // Render the driver's profile or a loading/error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Driver Profile</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            ) : (
              <p className="mt-1 text-gray-800">{name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            ) : (
              <p className="mt-1 text-gray-800">{email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            {isEditing ? (
              <input
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            ) : (
              <p className="mt-1 text-gray-800">{contact}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleEditToggle}
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && (
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 mt-4 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Update Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

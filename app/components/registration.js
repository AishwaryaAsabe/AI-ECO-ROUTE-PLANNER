"use client";
import { useState } from 'react';
import UserRegistrationForm from './userRegistrationForm';
import DriverRegistrationForm from './driverRegistrationFrom';

export default function RegistrationForm() {
  const [role, setRole] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="mb-4 p-4 border rounded shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Register</h3>
      <select
        value={role}
        onChange={handleRoleChange}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="">Select role</option>
        <option value="user">User</option>
        <option value="driver">Driver</option>
      </select>

      {role === 'user' && <UserRegistrationForm />}
      {role === 'driver' && <DriverRegistrationForm />}
    </div>
  );
}

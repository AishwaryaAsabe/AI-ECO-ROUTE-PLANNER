// app/components/AdminApproval.js
import { useEffect, useState } from 'react';

export default function AdminApproval() {
  const [pendingDrivers, setPendingDrivers] = useState([]);

  useEffect(() => {
    async function fetchPendingDrivers() {
      const res = await fetch('/api/drivers/pending');
      const drivers = await res.json();
      setPendingDrivers(drivers);
    }
    fetchPendingDrivers();
  }, []);

  const approveDriver = async (id) => {
    await fetch('/api/drivers/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setPendingDrivers((prev) => prev.filter((driver) => driver._id !== id));
  };

  return (
    <div>
      <h2>Pending Driver Approvals</h2>
      {pendingDrivers.map((driver) => (
        <div key={driver._id}>
          <p>{driver.name} - {driver.contact}</p>
          <h3>Vehicles</h3>
          <ul>
            {driver.vehicles.map((vehicle, index) => (
              <li key={index}>{vehicle.model} - {vehicle.registrationNumber}</li>
            ))}
          </ul>
          <button onClick={() => approveDriver(driver._id)}>Approve Driver and Vehicles</button>
        </div>
      ))}
    </div>
  );
}

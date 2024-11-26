// // DriverRegistration.js
// "use client";
// import { useState } from 'react';
// import VehicleForm from './VehicleForm'; // Adjust the path as necessary

// export default function DriverRegistration() {
//   const [driverDetails, setDriverDetails] = useState({
//     name: '',
//     email: '',
//     password: '',
//     contact:''
//   });
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [showVehicleForm, setShowVehicleForm] = useState(false);
//   const [driverId, setDriverId] = useState(null); // State to hold the driver's ID


//   const handleDriverSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/auth/registerDriver', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(driverDetails),
//     });
    
//     const data = await res.json();
//     console.log(data); // Check the content of data
  
//     if (data.driver) { // Check if driver object exists
//       setDriverId(data.driver._id); // Safely access _id now
//     } else {
//       console.error("Driver object not found in response:", data);
//     }
  
//     setIsRegistered(true);
//   };
  

//   return (
//     <div>
//       {!showVehicleForm ? (
//         <form onSubmit={handleDriverSubmit} className="mb-4 p-4 border rounded shadow-md bg-white">
//           <h3 className="text-lg font-semibold mb-2">Register as Driver</h3>
//           <input
//             type="text"
//             placeholder="Name"
//             value={driverDetails.name}
//             onChange={(e) => setDriverDetails({ ...driverDetails, name: e.target.value })}
//             className="border p-2 rounded mb-2 w-full"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={driverDetails.email}
//             onChange={(e) => setDriverDetails({ ...driverDetails, email: e.target.value })}
//             className="border p-2 rounded mb-2 w-full"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={driverDetails.password}
//             onChange={(e) => setDriverDetails({ ...driverDetails, password: e.target.value })}
//             className="border p-2 rounded mb-2 w-full"
//           />
//           <input
//             type="number"
//             placeholder="contact"
//             value={driverDetails.contact}
//             onChange={(e) => setDriverDetails({ ...driverDetails, contact: e.target.value })}
//             className="border p-2 rounded mb-2 w-full"
//           />

//           <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register Driver</button>
//         </form>
//       ) : (
//         <VehicleForm driverId={driverId} /> // Pass driver's ID to the VehicleForm
//       )}
//       {isRegistered && !showVehicleForm && (
//         <button onClick={() => setShowVehicleForm(true)} className="bg-green-600 text-white p-2 rounded">
//           Register Vehicle
//         </button>
//       )}
//     </div>
//   );
// }



"use client";
import { useState } from 'react';
import VehicleForm from './VehicleForm'; // Adjust the path as necessary

export default function DriverRegistration() {
  const [driverDetails, setDriverDetails] = useState({
    name: '',
    email: '',
    password: '',
    contact: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [driverId, setDriverId] = useState(null); // State to hold the driver's ID
  const [error, setError] = useState(null); // State for error message

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const res = await fetch('/api/auth/registerDriver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverDetails),
      });

      const data = await res.json();
      if (!res.ok) { // Handle errors based on response status
        throw new Error(data.error || 'Registration failed');
      }

      setDriverId(data.driver._id); // Set driver ID if registration is successful
      setIsRegistered(true);
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <div>
      {!showVehicleForm ? (
        <form onSubmit={handleDriverSubmit} className="mb-4 p-4 border rounded shadow-md bg-white">
          <h3 className="text-lg font-semibold mb-2">Register as Driver</h3>
          
          {error && ( // Display error message
            <div className="text-red-500 mb-2">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Name"
            value={driverDetails.name}
            onChange={(e) => setDriverDetails({ ...driverDetails, name: e.target.value })}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={driverDetails.email}
            onChange={(e) => setDriverDetails({ ...driverDetails, email: e.target.value })}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={driverDetails.password}
            onChange={(e) => setDriverDetails({ ...driverDetails, password: e.target.value })}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Contact"
            value={driverDetails.contact}
            onChange={(e) => setDriverDetails({ ...driverDetails, contact: e.target.value })}
            className="border p-2 rounded mb-2 w-full"
          />

          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register Driver</button>
        </form>
      ) : (
        <VehicleForm driverId={driverId} /> // Pass driver's ID to the VehicleForm
      )}
      {isRegistered && !showVehicleForm && (
        <button onClick={() => setShowVehicleForm(true)} className="bg-green-600 text-white p-2 rounded">
          Register Vehicle
        </button>
      )}
    </div>
  );
}

"use client";
import React from 'react';
import VehicleForm from '../../components/VehicleForm';
import DriverProfile from '../../components/driverProfile'; // Import DriverProfile component

export default function DriversDashboardFormPage() {
    return (
    //     <div className="flex flex-row mt-6 items-start  h-screen bg-gray-100">
    //     <div className="w-full max-w-md mr-6"> 
    //         <DriverProfile /> {/* Include DriverProfile component */}
    //     </div>
    //     <div className="w-full max-w-md">
    //         <VehicleForm /> {/* VehicleForm component */}
    //     </div>
    // </div>

<section className="grid grid-cols-2 gap-6">
    <div>
        <DriverProfile /> {/* Include DriverProfile component */}
    </div>
    <div className="mt-14">
        <VehicleForm /> {/* Include VehicleForm component */}
    </div>
</section>

    );
}

"use client";
import React from 'react';
import VehicleForm from '../../components/VehicleForm';
import DriverProfile from '../../components/driverProfile'; // Import DriverProfile component

export default function DriversDashboardFormPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md mb-6">
                <DriverProfile /> {/* Include DriverProfile component */}
            </div>
            <div className="w-full max-w-md">
                <VehicleForm /> {/* VehicleForm component remains as is */}
            </div>
        </div>
    );
}

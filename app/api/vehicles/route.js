import Vehicle from '../../models/Vehicles'; // Adjust the path as necessary
import dbConnect from '../../utils/db';
import  Driver from '../../models/Driver'


export async function POST(req) {
  await dbConnect();

  const { type, fuelType, capacity, driverId } = await req.json();

  // Basic validation
  if (!type || !fuelType || !capacity || !driverId) {
    return new Response(
      JSON.stringify({ error: 'All fields required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Create the vehicle but mark it as not approved
    const vehicle = await Vehicle.create({
      type,
      fuelType,
      capacity: Number(capacity), // Ensure capacity is stored as a number
      driver: driverId, // Link to the driver's ID
      isApproved: false, // Initially set to false
    });

    // Notify admin for approval (this can be an email, a message in an admin dashboard, etc.)
    // Implement your notification logic here

    return new Response(
      JSON.stringify({ message: 'Vehicle registration submitted for approval', vehicle }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to register vehicle' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    // Find all vehicles where isApproved is false (i.e., pending approval)
    const pendingVehicles = await Vehicle.find({ isApproved: false }).populate('driver');

    return new Response(JSON.stringify(pendingVehicles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch pending vehicles' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

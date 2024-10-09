import Vehicle from '../../models/Vehicles'; // Adjust the path as necessary
import dbConnect from '../../utils/db'; // Adjust the path as necessary

export async function POST(req) {
  await dbConnect();

  const { type, fuelType, capacity, driverId } = await req.json();

  // Basic validation
  if (!type || !fuelType || !capacity || !driverId) {
    return new Response(
      JSON.stringify({ error: 'All fields required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }, // Fixed typo
      }
    );
  }

  try {
    // Create the vehicle and associate it with the driver
    const vehicle = await Vehicle.create({
      type,
      fuelType,
      capacity: Number(capacity), // Ensure capacity is stored as a number
      driver: driverId, // Link to the driver's ID
    });

    return new Response(
      JSON.stringify({ message: 'Vehicle Registered Successfully', vehicle }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to Register Vehicle' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }, // Fixed typo
      }
    );
  }
}





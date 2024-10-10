
import Vehicle from '../../../models/Vehicles'; // Adjust the path as necessary
import dbConnect from '../../../utils/db';


export async function POST(req) {
  await dbConnect();

  try {
    const { vehicleId, isApproved, adminComments } = await req.json();

    // Basic validation
    if (!vehicleId || isApproved === undefined) {
      return new Response(
        JSON.stringify({ error: 'Vehicle ID and approval status required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Update the vehicle's approval status and add admin comments if approved
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      {
        isApproved,
        adminComments: isApproved ? adminComments : undefined, // Only add comments if approved
      },
      { new: true }
    );

    if (!updatedVehicle) {
      return new Response(
        JSON.stringify({ error: 'Vehicle not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (isApproved) {
      console.log('Vehicle approved');
    } else {
      console.log('Vehicle rejected');
    }


    return new Response(
      JSON.stringify({ message: 'Vehicle approval status updated', updatedVehicle }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to update vehicle approval status' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
  
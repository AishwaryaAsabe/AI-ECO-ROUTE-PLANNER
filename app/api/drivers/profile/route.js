import dbConnect from '../../../utils/db';
import Driver from '../../../models/Driver';

export async function GET(req) {
  await dbConnect(); // Ensure database connection

  const { searchParams } = new URL(req.url);
  const driverId = searchParams.get('driverId'); // Get the 'driverId' query parameter properly

  console.log('Driver ID in Backend:', driverId);  // Check if driverId is correctly passed to backend
  
  if (!driverId) {
    return new Response(JSON.stringify({ error: 'Driver ID is required' }), { status: 400 });
  }

  try {
    const driver = await Driver.findById(driverId).select('-password'); // Exclude sensitive fields like password
    if (!driver) {
      return new Response(JSON.stringify({ error: 'Driver not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(driver), { status: 200 });
  } catch (error) {
    console.error('Error fetching driver profile:', error);
    return new Response(JSON.stringify({ error: 'Error fetching driver profile' }), { status: 500 });
  }
}




// PUT: Update driver profile by ID
export async function PUT(req) {
  await dbConnect(); // Ensure database connection

  try {
    const { id, name, email, contact } = await req.json(); // Get updated driver data from request body
    if (!id) {
      return new Response(JSON.stringify({ error: 'Driver ID is required' }), { status: 400 });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(id, { name, email, contact }, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedDriver) {
      return new Response(JSON.stringify({ error: 'Driver not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedDriver), { status: 200 });
  } catch (error) {
    console.error("Error updating driver profile:", error);
    return new Response(JSON.stringify({ error: 'Error updating driver profile' }), { status: 500 });
  }
}


// DELETE: Delete driver profile by ID
export async function DELETE(req) {
  await dbConnect(); // Ensure database connection

  const { userId: driverId } = req.query; // Get the 'userId' query parameter properly

  console.log("Driver ID in Backend:", driverId);  // Check if driverId is correctly passed to backend
  
  if (!driverId) {
    return new Response(JSON.stringify({ error: 'Driver ID is required' }), { status: 400 });
  }

  try {
    const deletedDriver = await Driver.findByIdAndDelete(driverId); // Delete driver by ID
    if (!deletedDriver) {
      return new Response(JSON.stringify({ error: 'Driver not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Driver deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting driver profile:", error);
    return new Response(JSON.stringify({ error: 'Error deleting driver profile' }), { status: 500 });
  }
}

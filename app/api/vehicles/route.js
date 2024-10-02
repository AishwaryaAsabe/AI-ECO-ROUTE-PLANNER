import dbConnect from '../../utils/db';
import Vehicle from '../../models/Vehicles';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const vehicle = new Vehicle(body);
    await vehicle.save();
    return new Response(JSON.stringify(vehicle), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create vehicle' }), { status: 400 });
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const vehicles = await Vehicle.find({});
    return new Response(JSON.stringify(vehicles), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch vehicles' }), { status: 400 });
  }
}

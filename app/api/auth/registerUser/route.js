import User from '../../../models/User';  // Adjust the path as necessary
import dbConnect from '../../../utils/db';  // Adjust the path as necessary
import bcrypt from 'bcrypt';

export async function POST(req) {
  await dbConnect();

  const { username, email, password } = await req.json(); // Parse the incoming JSON

  // Basic validation
  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({ error: 'All fields are required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User already exists with this email.' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: 'User registered successfully', user }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Failed to register user' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// import User from '../../../models/User';  // Adjust the path as necessary
// import dbConnect from '../../../utils/db';  // Adjust the path as necessary
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   await dbConnect();

//   const { username, email, password } = await req.json(); // Parse the incoming JSON

//   // Basic validation
//   if (!username || !email || !password) {
//     return new Response(
//       JSON.stringify({ error: 'All fields are required.' }),
//       {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new Response(
//         JSON.stringify({ error: 'User already exists with this email.' }),
//         {
//           status: 409,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     return new Response(
//       JSON.stringify({ message: 'User registered successfully', user }),
//       {
//         status: 201,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to register user' }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
import User from '../../../models/User';  // Adjust the path as necessary
import dbConnect from '../../../utils/db';  // Adjust the path as necessary
import bcrypt from 'bcrypt';
import axios from 'axios';

export async function POST(req) {
  await dbConnect();
  
  const { name, email, password, contact } = await req.json();

  // Basic validation
  if (!name || !email || !password || !contact) {
    return new Response(
      JSON.stringify({ error: 'All fields are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate email using Kickbox API
  try {
    const kickboxApiKey = process.env.KICKBOX_API_KEY;
    const emailValidationUrl = `https://api.kickbox.com/v2/verify?email=${email}&apikey=${kickboxApiKey}`;
    
    const emailResponse = await axios.get(emailValidationUrl);
    if (emailResponse.data.result !== 'deliverable') {
      return new Response(
        JSON.stringify({ error: 'Invalid or non-existent email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Kickbox validation failed:', error);
    return new Response(
      JSON.stringify({ error: 'Email validation service error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword, contact });

    return new Response(
      JSON.stringify({ message: 'User registered successfully', user }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to register user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

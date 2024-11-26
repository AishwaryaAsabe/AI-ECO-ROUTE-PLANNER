// import Driver from '../../../models/Driver'; // Adjust the path as necessary
// import dbConnect from '../../../utils/db'; // Adjust the path as necessary
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   await dbConnect();


//     const { name, email, password, contact } = await req.json();

//     // Basic validation
//     if (!name || !email || !password || !contact) {
//       return new Response(
//         JSON.stringify({error:'All fields are required'}),
//         {
//           status:400,
//           headers:{'Content-Type':'application/json'},
//         }
//       );
//     }

//     try {
//       // Check if driver already exists
//       const existingDriver = await Driver.findOne({ email });
//       if (existingDriver) {
//         return new Response(
//           JSON.stringify({error:'Driver alredy exists'}),
//           {
//             status:409,
//             headers:{'Content-Type':'application/json'},
//           }
//         );
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create the driver
//       const driver = await Driver.create({
//         name,
//         email,
//         password: hashedPassword,
//         contact, // Save the contact number
//       });

//       return new Response(
//         JSON.stringify({
//           message:'Driver Registered Successfully' , driver
//         }),
//         {
//           status:201,
//           headers:{'Content-Type':'application/json'},
//         }
//       );
//   } catch(error){

//    console.error(error);
//    return new Response(
//     JSON.stringify({
//       error:'Failed to register Driver'
//     }),
//     {
//       status:500,
//       headers:{'Content-Type':'application/json'},
//     }
//    );
//   }
// }

import Driver from '../../../models/Driver';
import dbConnect from '../../../utils/db';
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

  // Check if driver already exists
  try {
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return new Response(
        JSON.stringify({ error: 'Driver already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash password and save driver
    const hashedPassword = await bcrypt.hash(password, 12);
    const driver = await Driver.create({ name, email, password: hashedPassword, contact });

    return new Response(
      JSON.stringify({ message: 'Driver registered successfully', driver }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to register driver' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

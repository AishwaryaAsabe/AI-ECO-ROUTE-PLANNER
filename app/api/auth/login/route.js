// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dbConnect from '../../../utils/db';
// import User from '../../../models/User'; // Users collection
// import Driver from '../../../models/Driver'; // Drivers collection

// export async function POST(req) {
//   await dbConnect();
//   const { email, password } = await req.json();

//   let user, role;

//   // 1. Check if the email belongs to an Admin
//   if (email === process.env.ADMIN_EMAIL) {
//     // If it's the predefined admin
//     if (password === process.env.ADMIN_PASSWORD) {
//       role = 'admin';
//       const token = jwt.sign({ role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       return new Response(JSON.stringify({ token, role }), { status: 200 });
//     } else {
//       return new Response(JSON.stringify({ error: 'Invalid admin password' }), { status: 400 });
//     }
//   }

//   // 2. Check if the email belongs to a Driver
//   user = await Driver.findOne({ email });
//   if (user) {
//     // Compare password for driver
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
//     }

//     // Generate JWT token for driver
//     role = 'driver';
//     const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return new Response(JSON.stringify({ token, role }), { status: 200 });
//   }

//   // 3. Check if the email belongs to a User
//   user = await User.findOne({ email });
//   if (user) {
//     // Compare password for user
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
//     }

//     // Generate JWT token for user
//     role = 'user';
//     const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return new Response(JSON.stringify({ token, role }), { status: 200 });
//   }

//   // If email not found in any collection
//   return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
// }


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../utils/db';
import User from '../../../models/User'; // Users collection
import Driver from '../../../models/Driver'; // Drivers collection

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  let user, role;

  // 1. Check if the email belongs to an Admin
  if (email === process.env.ADMIN_EMAIL) {
    // If it's the predefined admin
    if (password === process.env.ADMIN_PASSWORD) {
      role = 'admin';
      const token = jwt.sign({ role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return new Response(JSON.stringify({ token, role }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid admin password' }), { status: 400 });
    }
  }

  // 2. Check if the email belongs to a Driver
  user = await Driver.findOne({ email });
  if (user) {
    // Compare password for driver
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
    }

    // Generate JWT token for driver
    role = 'driver';
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return new Response(JSON.stringify({ token, role, userId: user._id }), { status: 200 });
  }

  // 3. Check if the email belongs to a User
  user = await User.findOne({ email });
  if (user) {
    // Compare password for user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
    }

    // Generate JWT token for user
    role = 'user';
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return new Response(JSON.stringify({ token, role, userId: user._id }), { status: 200 });
  }

  // If email not found in any collection
  return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
}

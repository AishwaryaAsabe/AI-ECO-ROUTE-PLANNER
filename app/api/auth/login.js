import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../utils/db';
import User from '../../models/User';

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ token }), { status: 200 });
}

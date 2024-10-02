import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../utils/db';
import User from '../../models/User';

export async function POST(req) {
  await dbConnect();
  const { username, password, email, role } = await req.json();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: role || 'user', // Default role to 'user', 'admin' for company
  });

  await user.save();

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ token }), { status: 201 });
}

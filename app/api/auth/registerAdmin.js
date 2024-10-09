// app/api/auth/registerAdmin.js
import { hash } from 'bcryptjs';
import { connectToDB } from '../../utils/db';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    await connectToDB();

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Predefined admin details (hardcoded)
    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: await hash('adminPassword', 10),
      role: 'admin',
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating admin.' });
  }
}

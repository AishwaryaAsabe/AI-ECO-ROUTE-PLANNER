// app/api/drivers/pending.js
import { connectToDB } from '../../../utils/db';
import Driver from '../../../models/Driver';

export default async function handler(req, res) {
  try {
    await connectToDB();

    const pendingDrivers = await Driver.find({ approved: false });
    res.status(200).json(pendingDrivers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pending drivers.' });
  }
}

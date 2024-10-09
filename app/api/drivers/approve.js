// app/api/drivers/approve.js
import { connectToDB } from '../../../utils/db';
import Driver from '../../../models/Driver';

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    await connectToDB();

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    // Approve the driver and their vehicles
    driver.approved = true;
    await driver.save();

    res.status(200).json({ message: 'Driver and their vehicles approved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error approving driver.' });
  }
}

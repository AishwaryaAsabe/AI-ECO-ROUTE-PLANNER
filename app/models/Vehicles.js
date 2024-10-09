import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  fuelType: { type: String, required: true },
  capacity: { type: Number, required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true }, // Reference to Driver
}, { timestamps: true });

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

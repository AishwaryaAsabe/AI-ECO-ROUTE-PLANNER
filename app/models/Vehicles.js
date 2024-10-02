import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  fuelType: { type: String, required: true },
  capacity: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

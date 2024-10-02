import mongoose from 'mongoose';

const EmissionsSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export default mongoose.models.Emissions || mongoose.model('Emissions', EmissionsSchema);

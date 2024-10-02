import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  distance: { type: Number, required: true },
  emissions: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Route || mongoose.model('Route', RouteSchema);

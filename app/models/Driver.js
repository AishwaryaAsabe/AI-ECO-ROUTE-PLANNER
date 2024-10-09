import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact:{type:Number , required:true},
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }], // Reference to Vehicle collection
}, { timestamps: true });

export default mongoose.models.Driver || mongoose.model('Driver', driverSchema);

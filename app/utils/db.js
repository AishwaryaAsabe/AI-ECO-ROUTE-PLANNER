import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        mongoose.connection.on('connected', () => {
          console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });

        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Optional cleanup on application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to application termination');
  process.exit(0);
});

export default dbConnect;

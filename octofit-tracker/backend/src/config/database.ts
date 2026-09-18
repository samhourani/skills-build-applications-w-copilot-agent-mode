import mongoose from 'mongoose';

export const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const databaseState = {
  connected: false,
};

mongoose.set('strictQuery', true);

mongoose.connection.on('connected', () => {
  databaseState.connected = true;
  console.log(`Connected to MongoDB: ${connectionString}`);
});

mongoose.connection.on('error', (error) => {
  databaseState.connected = false;
  console.error('MongoDB connection error:', error);
});

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    databaseState.connected = true;
    return mongoose.connection;
  }

  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 3000,
    });
    databaseState.connected = true;
    return mongoose.connection;
  } catch (error) {
    databaseState.connected = false;
    console.warn(
      'MongoDB is not available. Continuing with in-memory data fallbacks.',
      error instanceof Error ? error.message : String(error),
    );
    return mongoose.connection;
  }
}

export default mongoose.connection;

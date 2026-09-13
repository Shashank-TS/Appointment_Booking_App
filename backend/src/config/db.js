import mongoose from "mongoose";

const connectdb = () => {
   mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

export default connectdb;
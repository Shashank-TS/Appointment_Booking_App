import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import connectdb from './src/config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

connectdb()

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running locally");
  });
}
export default app;

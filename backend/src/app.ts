import express from 'express';
import cors from 'cors';
import { conversionRateRouter } from './routes/conversionRateRouter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fetchConversionRate } from './services/conversionRateService';

dotenv.config();
export const app = express();
app.use(cors()); // Enable CORS for frontend interaction
app.use(express.json());

// Routes
app.use('/api/conversion-rate', conversionRateRouter())

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));
}

// Cron job
cron.schedule('* * * * * *', async () => {
  console.log('Fetching conversion rate every 5 minutes...')
  const currentRate = await fetchConversionRate()
  console.log(`Done! Current rate: ${currentRate.toFixed(8)}`)
})
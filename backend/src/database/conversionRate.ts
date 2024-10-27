import mongoose from "mongoose";

const conversionRateSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  totalAssets: { type: String, required: true},
  totalSupply: { type: String, required: true},
})

export default mongoose.model('ConversionRate', conversionRateSchema)
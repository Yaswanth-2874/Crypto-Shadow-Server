import mongoose from "mongoose";

const TradeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String, // buy or sell
  symbol: String,
  price: Number,
  quantity: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Trade", TradeSchema);

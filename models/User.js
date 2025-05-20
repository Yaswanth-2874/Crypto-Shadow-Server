import mongoose from "mongoose";

const HoldingSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  avgPrice: Number,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  cash: { type: Number, default: 100000 },
  holdings: [HoldingSchema],
});

export default mongoose.model("User", UserSchema);

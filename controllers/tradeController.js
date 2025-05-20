import User from "../models/User.js";
import Trade from "../models/Trade.js";
import fetchPrice from "../utils/priceFetcher.js";

export const buy = async (req, res) => {
  const { symbol, quantity } = req.body;
  const price = await fetchPrice(symbol);
  const cost = price * quantity;

  const user = await User.findById(req.user.id);
  if (user.cash < cost) return res.status(400).send("Insufficient funds");

  const existing = user.holdings.find(h => h.symbol === symbol);
  if (existing) {
    existing.avgPrice = ((existing.avgPrice * existing.quantity) + cost) / (existing.quantity + quantity);
    existing.quantity += quantity;
  } else {
    user.holdings.push({ symbol, quantity, avgPrice: price });
  }

  user.cash -= cost;
  await user.save();
  await Trade.create({ userId: user._id, type: "buy", symbol, price, quantity });

  res.send("Buy successful");
};

export const sell = async (req, res) => {
  const { symbol, quantity } = req.body;
  const price = await fetchPrice(symbol);
  const revenue = price * quantity;

  const user = await User.findById(req.user.id);
  const holding = user.holdings.find(h => h.symbol === symbol);
  if (!holding || holding.quantity < quantity) return res.status(400).send("Not enough holdings");

  holding.quantity -= quantity;
  if (holding.quantity === 0) user.holdings = user.holdings.filter(h => h.symbol !== symbol);
  user.cash += revenue;

  await user.save();
  await Trade.create({ userId: user._id, type: "sell", symbol, price, quantity });

  res.send("Sell successful");
};

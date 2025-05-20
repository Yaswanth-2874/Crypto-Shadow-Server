import User from "../models/User.js";
import Trade from "../models/Trade.js";

export const getPortfolio = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    cash: user.cash,
    holdings: user.holdings,
  });
};

export const getHistory = async (req, res) => {
  const trades = await Trade.find({ userId: req.user.id }).sort({ timestamp: -1 });
  res.json(trades);
};

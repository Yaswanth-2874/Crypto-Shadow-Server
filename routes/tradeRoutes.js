import express from "express";
import { buy, sell } from "../controllers/tradeController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/buy", auth, buy);
router.post("/sell", auth, sell);

export default router;

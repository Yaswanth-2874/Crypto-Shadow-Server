import express from "express";
import { getPortfolio, getHistory } from "../controllers/portfolioController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getPortfolio);
router.get("/history", auth, getHistory);

export default router;

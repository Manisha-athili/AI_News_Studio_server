import express from "express";
import generateArticleController from "../controllers/aiController.js";

const router = express.Router();
router.post("/", generateArticleController )

export default router; 
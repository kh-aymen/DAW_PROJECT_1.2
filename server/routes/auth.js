import express from "express";
import { UpdatePassword, login } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/updateEmailAndPassword/:id", verifyToken, UpdatePassword);

export default router;

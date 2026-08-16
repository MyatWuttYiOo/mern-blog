import { Router } from "express";
import { register, login } from "../controllers/userController";

const router = Router();

// Register Route: POST /api/auth/register
router.post("/register", register);

// Login Route: POST /api/auth/login
router.post("/login", login);

export default router;
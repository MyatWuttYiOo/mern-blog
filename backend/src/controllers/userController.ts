import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// User Register
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error during registration" });
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server Error during login" });
  }
};
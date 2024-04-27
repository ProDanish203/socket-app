import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
// import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", verifyAuth(), logoutUser);

export default router;

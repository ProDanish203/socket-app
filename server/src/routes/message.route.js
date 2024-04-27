import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/send/:id", verifyAuth, sendMessage);
// router.post("/login", loginUser);
// router.post("/logout", verifyAuth(), logoutUser);

export default router;

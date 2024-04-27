import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/send/:id", verifyAuth, sendMessage);
router.get("/:id", verifyAuth, getMessages);

export default router;

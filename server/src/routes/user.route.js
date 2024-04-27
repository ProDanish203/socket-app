import { Router } from "express";
import { getAllUsers, getCurrentUser } from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyAuth, getAllUsers);
router.get("/current-user", verifyAuth, getCurrentUser);
// router.get("/:id", verifyAuth, getMessages);

export default router;

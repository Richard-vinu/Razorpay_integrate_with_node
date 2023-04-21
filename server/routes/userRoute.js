import express from "express";
import { Auth } from "../utils/auth.js";
import { signIn, signUp, updateUserProfile, viewProfile } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile/me", Auth, viewProfile);
router.put("/profile/update", Auth, updateUserProfile);

export default router;

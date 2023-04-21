import express from "express";
const router = express.Router();

import { subAdminLogin, subAdminRegister } from "../controllers/subAdminController.js";
import { Auth } from "../utils/auth.js";



router.post("/register",Auth, subAdminRegister);
router.post("/login",subAdminLogin)

export default router;

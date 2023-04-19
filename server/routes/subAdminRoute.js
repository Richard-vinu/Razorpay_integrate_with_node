import express from "express";
const router = express.Router();

import { subAdminLogin, subAdminRegister } from "../controllers/subAdminController.js";



router.post("/register", subAdminRegister);
router.post("/login",subAdminLogin)

export default router;

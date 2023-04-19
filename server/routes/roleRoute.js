import express from "express";
const router = express.Router();
import { createRole } from "../controllers/roleController.js";



router.post("/create", createRole);
router.post("/hello", (req, res) => {
  res.status(200).send("OK");
});



export default router;





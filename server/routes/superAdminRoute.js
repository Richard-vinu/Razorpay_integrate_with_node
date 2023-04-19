import express from "express";
const router = express.Router();
// import * as user from "../utils/user.json"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post("/login",(req, res) => { 
    
    try {
    const body = req.body;
    const { email, password } = body;

    if (!email)
      return res.status(400).send({ status: false, message: "User email-id is required" });

    if (!password)
      return res .status(400) .send({ status: false, message: "User password is required" });

    let payload = { role:"super-admin" };
    let token = jwt.sign(payload, "secret-key");

    res.status(200).send({ status: true,message: "Super-Admin login successfully",data: {token: token },
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});


export default router;

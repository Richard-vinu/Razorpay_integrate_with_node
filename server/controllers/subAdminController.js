import subAdminModel from "../models/subAdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const subAdminRegister = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    const result = await subAdminModel.create(data);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in registering");
  }
};



//POST /login
const subAdminLogin = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;

  

    if (!email)
      return res.status(400).send({ status: false, message: "User email-id is required" });

    if (!password)
      return res .status(400) .send({ status: false, message: "User password is required" });

    const user = await subAdminModel.findOne({ email });
    if (!user)
      return res.status(404).send({status: false,message: "This User does not exist Please SignUp",
      });

    let comparedPwd = await bcrypt.compare(password, user.password);

    if (!comparedPwd)
      return res .status(401) .send({ status: false, message: "Incorrect Password" });

    let payload = { subAdminId: user._id };
    let token = jwt.sign(payload, "secret-key");

    res.status(200).send({ status: true,message: "subAdmin login successfully",data: { subAdminId: user._id, token: token },
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



export { subAdminRegister, subAdminLogin };

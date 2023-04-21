import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import uploadFile from "../utils/aws.js";
import {
  isValidEmail,
  isValidPhone,
  isValidPwd,
  isValidString,
} from "../utils/validation.js";

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    if (files.length == 0)
      return res
        .status(400)
        .send({ status: false, message: `profileImage is Required` });

    let { name, email, phone, password } = data;

    if (!name)
      return res
        .status(400)
        .send({ status: false, message: `name is Required` });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: `E-mail is Required` });

    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: `This E-mail is Invalid` });

    let uniqueEmail = await userModel.findOne({ email: email });

    if (uniqueEmail)
      return res
        .status(400)
        .send({
          status: false,
          message: `This E-mail has already registered Pls Sign In`,
        });

    let uniquePhone = await userModel.findOne({ phone: phone });

    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: `phone is Required` });

    if (!isValidPhone(phone))
      return res
        .status(400)
        .send({ status: false, message: `Your Phone-no ${phone} is Invalid` });

    if (uniquePhone)
      return res.status(400).send({
        status: false,
        message: `This phone-no  Already registered Pls use different Number`,
      });

    if (!isValidPwd(password))
      return res.status(400).send({
        status: false,
        message:
          "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;

    let profileImg = await uploadFile(files[0]);
    data.profileImage = profileImg;

    const finalData = await userModel.create(data);

    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: finalData,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//! POST -->login
const signIn = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;


    if (!email)
      return res.status(400).send({ status: false, message: "User email-id is required" });

    if (!password)
      return res.status(400).send({ status: false, message: "User password is required" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).send({ status: false,
      message: "This User does not exist Please SignUp",
      });

    let comparedPwd = await bcrypt.compare(password, user.password);

    if (!comparedPwd)
      return res
        .status(401)
        .send({ status: false, message: "Incorrect Password" });

    let payload = { userId: user._id };
    let token = jwt.sign(payload, "secret-key");

    res.status(200).send({
      status: true,
      message: "User login successfully",
      data: { userId: user._id, token: token },
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//!View-Profile

const viewProfile = async (req, res) => {
  try {


    const user = await userModel.findById(req.token.userId);
  
    // console.log(req.token.userId);
    // console.log(user)


    res.status(200)
      .send({ status: true, message: "User profile details", data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


//!Profile-update
//PUT /user/:userId/profile

let updateUserProfile= async function (req, res) {
  try {
    let userId = req.token.userId;

    let data = req.body
    const { name, email, phone } = data;
    let files = req.files;
    
    if(files && files.length>0){
      let profileImgUrl = await uploadFile(files[0]);
      data.profileImage = profileImgUrl;
    }

  if (!isValidString(name))
      return res.status(400).send({
                status: false,
                message:
                  "Enter a valid first name and should not contain numbers",
              });

if(email){
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email-id" });
  
}

if(phone){
    if (!isValidPhone(phone))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid phone number" });

}
        

    let checkEmail = await userModel.findOne({ email:email });
    if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist" });

    let checkPhone = await userModel.findOne({ phone:phone });
    if (checkPhone) return res.status(400).send({ status: false, message: "Phone number already exist" });

    

    let updateUser = await userModel.findOneAndUpdate(
      {_id: userId},
      data,
      {new: true}
    )

    res.status(200).send({ status: true, message: "User profile updated", data: updateUser });
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}


export { signUp, signIn, viewProfile,updateUserProfile };

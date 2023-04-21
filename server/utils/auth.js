// import subAdminModel from "../models/subAdminModel";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js'


const Auth = async (req, res,next) => {
try {
        let bearer = req.headers.authorization
        if(!bearer) return res.status(400).send({ status: false, message: "Please, provide the token" });
 
        let token = bearer.split(' ')
     
       let decodedToken = jwt.verify(token[1],'secret-key')
      
       req.token = decodedToken

const user = await userModel.findById(req.token.userId);
   if (!user)
    return res.status(404).send({
 status: false,
       message: `Unauthorize`,
     });

       if(!decodedToken) return res.status(401).send({status: false, message: "You are Unauthorized"})
        
    next()
} catch (error) {
    console.log(error);
}
}

export { Auth };

import jwt from "jsonwebtoken";

//generate token
export const generateToken = (userId)=>{
    const token = jwt.sign({userid}, process.env.JWT_SECRET);
    return token;
}
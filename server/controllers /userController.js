import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// sign up 
export const signup = async (req, res)=> {
    const {fullname, email, password, bio} = req.body;

    try {
        if(!fullname || !email || !password || !bio){
            return res.json({success: false, message: "Missing Dteails"})
        }
        const user = await User.indOne({email});
        
        if(user){
            return res.json({success: false, message: "Account already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            fullname, email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id);
        
        res.json({success: true, userData: newUser, token, 
            message: "Account created successfully"
        });
    } catch (error) {
        console.log(error.message);
        
        res.json({success: false, message: error.message});
    }
}
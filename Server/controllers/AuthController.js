import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxLimit = 3 * 24 * 60 * 60 * 1000;
const createToken = (userId, email) =>{
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn:maxLimit})
}

export const signup = async (request, response, next) => {
    try {
        alert(request.body);
        const {email, password} = request.body;
        console.log(email);
        console.log(password)
        if(!email || !password){
            return response.status(400).send("Email and Password is required");
        }
        const user = await User.create({email, password});
        response.cookie("jwt", createToken(userId, email),{
            maxLimit, 
            secure: true,
            sameSite: nodemon,
        });
        return epsonse.status(200).json({
            user:{
                id: userId,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server error");
    }
}
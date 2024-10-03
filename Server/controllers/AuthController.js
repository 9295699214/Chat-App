import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxLimit = 3 * 24 * 60 * 60 * 1000;

const createToken = (userId, email) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxLimit });
};

export const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password are required");
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(409).send("User already exists with this email");
        }

        // Create the new user
        const user = await User.create({ email, password });

        // Get the userId from the created user
        const userId = user._id;

        response.cookie("jwt", createToken(userId, email), {
            maxAge: maxLimit,
            secure: true,
            sameSite: "strict", // Fix the value here (not nodemon)
        });

        return response.status(201).json({
            user: {
                id: userId,
                email: user.email,
                profileSetup: user.profileSetup,
            },
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server error");
    }
};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send("User does not exist with this email");
        }
        const auth= await compare(password, user.password);
        if(!auth){
            return response.status(404).send("Password is Incorrect");
        }
        const userId = user._id;
        response.cookie("jwt", createToken(user.id, email), {
            maxAge: maxLimit,
            secure: true,
            sameSite: "strict",
        });

        return response.status(200).json({
            user: {
                id: userId,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server error");
    }
};

export const getUserInfo = async (request, response, next) => {
    try {
        const userData = await User.findById(request.userId);
        if(!userData){
            return response.status(404).send("User with the given id not found");
        }

        return response.status(200).json({
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server error");
    }
};
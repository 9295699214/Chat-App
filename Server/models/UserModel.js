import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        unique: false
    },
    firstName:{
        type: String,
        unique: false
    },
    lastName:{
        type: String,
        unique: false
    },
    image:{
        type: String,
        unique: false
    },
    color:{
        type: Number,
        unique: false
    },
    profileSetup:{
        type: Boolean,
        unique: false
    }
})

userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt)
    next();
})

const User = mongoose.model("User", userSchema);


export default User;

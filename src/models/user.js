import mongoose from "mongoose";
import bcrypt from "bcrypt"

const Schema = mongoose.Schema;

export const UserSchema=new Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true

    },
    password:{
        type: String,
        require: true
    }
})  

UserSchema.methods.comparePassword = (plainPassword, password)=>{
    return bcrypt.compareSync(plainPassword, password)
}
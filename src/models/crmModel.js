import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ContactModel=new Schema({
    firstName:{
        type: String,
        require: "Enter the first name"
    },
    lastName:{
        type: String,
        require: "Enter the last name"

    }
})
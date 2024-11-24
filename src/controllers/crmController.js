import mongoose from "mongoose";
import { ContactModel } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactModel);

export const addNewContact = (req, res)=>{
    let newContact = new Contact(req.body);
    newContact.save((err, contact) => {
        if (err) {
            res.send(err)
        }
        res.json(contact)
    });
};

export const getAllContact = (req, res)=>{
    Contact.find({},(err, contact)=>{
        if (err) {
            res.send(err)
        }
        res.json(contact)
    })
};
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserSchema } from "../models/user";

const User = mongoose.model("User", UserSchema);

// Middleware for protected routes
export const loginRequest = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer Token
    if (token) {
        jwt.verify(token, "RESTFULAPIs", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized User!" });
            }
            req.user = decoded; // Attach user info to req object
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized User!" });
    }
};

// Register a new user
export const register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        const user = await newUser.save();
        user.password = undefined; // Hide password in the response
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login a user
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Authentication Failed: User not found" });
        }
        const isMatch = await user.comparePassword(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Authentication Failed: Wrong password" });
        }
        const token = jwt.sign(
            { email: user.email, username: user.username, _id: user._id },
            "RESTFULAPIs",
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

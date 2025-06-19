import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const secret = "JIs%WCfS#Sl454d5FX";

export const verifyToken = (req, res, next) => {
    console.log("verifyToken");
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
};

export const generateToken = (user) => {
    console.log("generateToken");
    return jwt.sign({ id: user._id }, secret);
};

export const authUser = async (req, res, next) => {
    console.log("authUser");
    if (req.params.id && req.params.id !== req.user.id)
        return res.status(401).json({ error: "Unauthorized" });
    next();
};

export const authLink = async (req, res, next) => {
    console.log("authLink");
    const user = await User.findById(req.user.id);
    if (!user)
        return res.status(401).json({ error: "Unauthorized" });
    req.links = user.links;

    next();
};




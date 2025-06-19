import AuthController from "../Controllers/authController.js";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/register", (req,res,next) => { console.log("register"); next();} ,AuthController.register);
AuthRouter.post("/login", (req,res,next) => { console.log("login"); next();} ,AuthController.login);

export default AuthRouter;

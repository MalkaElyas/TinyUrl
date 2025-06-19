import express from "express";
import  UserController  from "../Controllers/userController.js";

const UserRouter = express.Router();

UserRouter.get("/", (req,res,next) => { console.log("getAllUsers"); next();} ,UserController.getAllUsers);
UserRouter.get("/:id", (req,res,next) => { console.log("getUser"); next();} ,UserController.getUser);
// UserRouter.post("/", (req,res,next) => { console.log("postUser"); next();} ,UserController.postUser);
UserRouter.put("/:id", (req,res,next) => { console.log("putUser"); next();} ,UserController.putUser);
// UserRouter.put("/:id/links", UserController.getAllUserLinks);

UserRouter.delete("/:id", (req,res,next) => { console.log("deleteUser"); next();} ,UserController.deleteUser);

export default UserRouter;


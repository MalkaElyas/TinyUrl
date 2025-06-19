import express from "express";
import redirectController from "../Controllers/redirectController.js";

const redirectRouter = express.Router();

redirectRouter.get("/:shortId", (req,res,next) => { console.log("redirectLink"); next();} ,redirectController.redirectLink);

export default redirectRouter;

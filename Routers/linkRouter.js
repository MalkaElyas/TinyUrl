import express from "express";
import LinkController from "../Controllers/linkController.js";

const LinkRouter = express.Router();

LinkRouter.get("/:id", (req,res,next) => { console.log("getLink"); next();} , LinkController.getLink);
LinkRouter.get("/", (req,res,next) => { console.log("getAllLinks"); next();} , LinkController.getAllLinks);
LinkRouter.post("/", (req,res,next) => { console.log("postLink"); next();} , LinkController.postLink);
LinkRouter.put("/:id", (req,res,next) => { console.log("putLink"); next();} , LinkController.putLink);
LinkRouter.delete("/:id", (req,res,next) => { console.log("deleteLink"); next();} , LinkController.deleteLink);
//target
LinkRouter.get("/:id/targets", (req,res,next) => { console.log("getLinkTargets"); next();} , LinkController.getLinkTargets);
LinkRouter.post("/:id/targets", (req,res,next) => { console.log("postLinkTarget"); next();} , LinkController.postLinkTarget);
LinkRouter.put("/:id/targets/:targetId", (req,res,next) => { console.log("putLinkTarget"); next();} , LinkController.putLinkTarget);
LinkRouter.delete("/:id/targets/:targetId", (req,res,next) => { console.log("deleteLinkTarget"); next();} , LinkController.deleteLinkTarget);
//click
LinkRouter.get("/:id/clicks", (req,res,next) => { console.log("getClicksBySource"); next();} , LinkController.getClicksBySource);
export default LinkRouter;

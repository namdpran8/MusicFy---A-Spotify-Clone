/* This code snippet is setting up a router using the Express framework in a Node.js application. It
imports necessary modules such as `Router` from Express, `protectRoute` from an authentication
middleware file, and controller functions `getAllUsers` and `getMessages` from user controller file. */
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);

export default router;

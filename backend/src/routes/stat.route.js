/* This code snippet is setting up a route in a Node.js application using the Express framework. Here's
a breakdown of what each part is doing: */
import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;

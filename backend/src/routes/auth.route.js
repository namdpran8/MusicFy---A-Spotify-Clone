/* This code snippet is importing the `Router` class from the "express" module and the `authCallback`
function from the "../controller/auth.controller.js" file. It then creates a new instance of the
`Router` class, defines a POST route "/callback" that calls the `authCallback` function, and finally
exports the router instance as the default export. This code is setting up a route for handling
authentication callbacks in an Express application. */
import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", authCallback);

export default router;

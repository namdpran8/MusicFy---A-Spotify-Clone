/**
 * The above functions are middleware functions in a Node.js application that protect routes by
 * checking if a user is logged in and if they have admin privileges.
 * @param req - The `req` parameter in your code represents the HTTP request object, which contains
 * information about the incoming request from the client, such as the request headers, parameters,
 * body, and more. It is commonly used in Express.js middleware and route handlers to access and
 * manipulate the request data.
 * @param res - The `res` parameter in the code snippet refers to the response object in an Express.js
 * route handler. It is used to send a response back to the client making the HTTP request. The
 * response object (`res`) has methods like `res.status()` to set the HTTP status code, `res.json
 * @param next - The `next` parameter in the `protectRoute` and `requireAdmin` functions is a callback
 * function that is used to pass control to the next middleware function in the stack. When called, it
 * invokes the next middleware function in the stack. If an error is passed to `next`, Express will
 * @returns The code snippet provided includes two middleware functions: `protectRoute` and
 * `requireAdmin`.
 */
import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	if (!req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
		next(error);
	}
};

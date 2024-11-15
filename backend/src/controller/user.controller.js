/**
 * The above functions are used to retrieve all users except the current user and to retrieve messages
 * between two users.
 * @param req - The `req` parameter in your code represents the HTTP request object. It contains
 * information about the incoming request from the client, such as headers, parameters, body, and more.
 * In your code, you are accessing properties of the `req` object like `req.auth.userId` and
 * `req.params
 * @param res - The `res` parameter in your functions refers to the response object in Express.js. This
 * object represents the HTTP response that an Express app sends when it receives an HTTP request. You
 * can use methods on this object, such as `res.status()` and `res.json()`, to send back a response
 * @param next - The `next` parameter in your functions refers to the next middleware function in the
 * application's request-response cycle. When an error occurs or when you want to pass control to the
 * next middleware function, you can call `next(error)` to trigger the error handling middleware or
 * move to the next middleware in the
 */
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const currentUserId = req.auth.userId;
		const users = await User.find({ clerkId: { $ne: currentUserId } });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};

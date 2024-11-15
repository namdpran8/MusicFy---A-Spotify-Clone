/**
 * The authCallback function checks if a user exists based on clerkId and creates a new user if not
 * found, then returns a success response.
 * @param req - The `req` parameter in the `authCallback` function is an object that represents the
 * HTTP request. It contains information about the request made by the client, such as the request
 * headers, body, parameters, and other details. In this case, the function is expecting to receive
 * data in the request
 * @param res - The `res` parameter in the `authCallback` function is the response object that will be
 * sent back to the client making the request. It is used to send a response back to the client with
 * the status code and any data that needs to be returned. In this case, the response is being
 * @param next - The `next` parameter in the `authCallback` function is a reference to the next
 * middleware function in the application's request-response cycle. It is a callback function that is
 * used to pass control to the next middleware function. If an error occurs or if you need to pass
 * control to the error handling
 */
import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

		// check if user already exists
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// signup
			await User.create({
				clerkId: id,
				fullName: `${firstName || ""} ${lastName || ""}`.trim(),
				imageUrl,
			});
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};

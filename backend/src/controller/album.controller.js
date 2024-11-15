/**
 * The above functions are used to retrieve all albums and a specific album by ID from a database in a
 * Node.js application.
 * @param req - `req` stands for the HTTP request object, which contains information about the client
 * request such as headers, parameters, body, and more. It is passed to the route handler functions in
 * Express.js to access and process the incoming request data.
 * @param res - The `res` parameter in the functions `getAllAlbums` and `getAlbumById` stands for the
 * response object in Express.js. It is used to send a response back to the client making the request.
 * In the code snippet you provided, `res` is used to set the status of
 * @param next - The `next` parameter in the functions `getAllAlbums` and `getAlbumById` is a callback
 * function that is used to pass errors to the Express error handling middleware. If an error occurs
 * during the execution of the asynchronous code in the try block, the `next` function is called with
 */
import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
	try {
		const albums = await Album.find();
		res.status(200).json(albums);
	} catch (error) {
		next(error);
	}
};

export const getAlbumById = async (req, res, next) => {
	try {
		const { albumId } = req.params;

		const album = await Album.findById(albumId).populate("songs");

		if (!album) {
			return res.status(404).json({ message: "Album not found" });
		}

		res.status(200).json(album);
	} catch (error) {
		next(error);
	}
};

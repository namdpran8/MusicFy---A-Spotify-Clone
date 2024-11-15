/**
 * The above functions are used to fetch different sets of songs from a MongoDB database for a music
 * application, including all songs, featured songs, personalized songs, and trending songs.
 * @param req - The `req` parameter in the functions refers to the request object, which contains
 * information about the HTTP request that triggered the function. This object includes details such as
 * the request headers, parameters, body, query parameters, and more. It allows you to access and
 * process data sent by the client to the
 * @param res - The `res` parameter in the functions refers to the response object in Express.js. It is
 * used to send a response back to the client making the request. In this case, the `res.json(songs)`
 * statement is sending the retrieved songs as a JSON response to the client.
 * @param next - The `next` parameter in the functions `getAllSongs`, `getFeaturedSongs`,
 * `getMadeForYouSongs`, and `getTrendingSongs` is a callback function that is used to pass errors to
 * the Express error handling middleware. If an error occurs during the execution of the asynchronous
 * function,
 */
import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
	try {
		// -1 = Descending => newest -> oldest
		// 1 = Ascending => oldest -> newest
		const songs = await Song.find().sort({ createdAt: -1 });
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getFeaturedSongs = async (req, res, next) => {
	try {
		// fetch 6 random songs using mongodb's aggregation pipeline
		const songs = await Song.aggregate([
			{
				$sample: { size: 6 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getMadeForYouSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getTrendingSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

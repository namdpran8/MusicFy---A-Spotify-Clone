/**
 * The `getStats` function retrieves statistics such as total songs, albums, users, and unique artists
 * from a database and returns them in a JSON response.
 * @param req - The `req` parameter in the `getStats` function stands for the request object. It
 * represents the HTTP request that comes from the client to the server and contains information about
 * the request such as the URL, headers, parameters, body, etc. This parameter is commonly used in
 * Express.js or other
 * @param res - The `res` parameter in the `getStats` function is the response object that will be used
 * to send a response back to the client making the request. It is typically used to send data, status
 * codes, and other information back to the client. In this case, the `res` object
 * @param next - The `next` parameter in the `getStats` function is a callback function that is used to
 * pass any errors that occur during the execution of the function to the next middleware function in
 * the Express middleware chain. If an error occurs in the `try` block of the `getStats` function,
 */
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),

			Song.aggregate([
				{
					$unionWith: {
						coll: "albums",
						pipeline: [],
					},
				},
				{
					$group: {
						_id: "$artist",
					},
				},
				{
					$count: "count",
				},
			]),
		]);

		res.status(200).json({
			totalAlbums,
			totalSongs,
			totalUsers,
			totalArtists: uniqueArtists[0]?.count || 0,
		});
	} catch (error) {
		next(error);
	}
};

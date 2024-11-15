/* This code snippet is defining a Mongoose schema for an album in a music application. Here's a
breakdown of what each part is doing: */
import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		artist: { type: String, required: true },
		imageUrl: { type: String, required: true },
		releaseYear: { type: Number, required: true },
		songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
	},
	{ timestamps: true }
); //  createdAt, updatedAt

export const Album = mongoose.model("Album", albumSchema);

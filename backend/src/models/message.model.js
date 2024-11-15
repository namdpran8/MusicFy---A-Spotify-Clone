/* This JavaScript code snippet is defining a Mongoose schema for a message entity in a MongoDB
database. Here's a breakdown of what each part is doing: */
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: { type: String, required: true }, // Clerk user ID
		receiverId: { type: String, required: true }, // Clerk user ID
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

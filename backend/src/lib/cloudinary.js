/* This JavaScript code snippet is importing the `v2` module from the `cloudinary` library and
assigning it an alias `cloudinary`. It also imports the `dotenv` library to load environment
variables from a `.env` file. */
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/* This code snippet is setting up a router using the Express framework in a Node.js application. It
imports the `Router` class from the `express` package and two functions `getAlbumById` and
`getAllAlbums` from the `album.controller.js` file. */
import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;

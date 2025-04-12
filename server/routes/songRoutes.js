import express from "express";
import {
	getSongs,
	addSong,
	getTopSongs,
	getNewReleases,
	getRandom,
	getAroundYou,
	likeSong,
} from "../controllers/songController.js";
import { verifyToken } from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", getSongs);
router.post("/", addSong); // 👈 new POST route
router.get("/top", getTopSongs);
router.get("/releases", getNewReleases);
router.get("/random", getRandom);
router.get("/popular", getAroundYou);
router.patch("/like/:id", verifyToken, likeSong);

export { router as songsRouter };

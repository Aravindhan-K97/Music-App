import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/dbConnection.js";
import { songsRouter } from "./routes/songRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { artisteRouter } from "./routes/artisteRoutes.js";
import { playlistRouter } from "./routes/playlistRoutes.js";
import { artistes, songs } from "./data.js";
import Song from "./models/Song.js";
import Artiste from "./models/Artiste.js";


dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "https://music-app61.netlify.app", // Specify the frontend origin
  credentials: true, 
};

app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with options

// Connect to database
connectDb();

const newSongs = songs.map((song) => {
		return {
			...song,
			likes: {},
 	};
 });



// Define API routes
app.use("/api/songs/", songsRouter);
app.use("/api/users/", userRouter);
app.use("/api/artistes/", artisteRouter);
app.use("/api/playlists/", playlistRouter);

const songs = Song.find();
const artistes = Artiste.find();
  await songs.deleteMany();
   await artistes.deleteMany();
  Artiste.insertMany(artistes);
 	Song.insertMany(newSongs);

// Start the server
const port = process.env.PORT || 6000;
app.listen(port, async () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});

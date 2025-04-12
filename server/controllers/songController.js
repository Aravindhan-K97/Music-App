import Song from "../models/Song.js";
import User from "../models/User.js";

// Get all songs
const getSongs = async (req, res) => {
	const songs = await Song.find({});
	if (!songs) {
		return res.status(400).json({ message: "An error occurred!" });
	}
	const shuffledSongs = songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
	res.status(200).json(shuffledSongs);
};

// Add a new song
const addSong = async (req, res) => {
	try {
		const { title, duration, coverImage, artistes, artistIds, songUrl, type } = req.body;

		if (!title || !duration || !songUrl) {
			return res.status(400).json({ message: "Title, duration and song URL are required." });
		}

		const newSong = new Song({
			title,
			duration,
			coverImage,
			artistes,
			artistIds,
			songUrl,
			type,
		});

		const savedSong = await newSong.save();
		res.status(201).json(savedSong);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Other existing controllers...
const getTopSongs = async (req, res) => {
	try {
		const results = await Song.aggregate([
			{
				$project: {
					title: 1,
					duration: 1,
					coverImage: 1,
					artistes: 1,
					songUrl: 1,
					artistIds: 1,
					type: 1,
					likes: { $size: { $objectToArray: "$likes" } },
				},
			},
			{ $sort: { likes: -1 } },
			{ $limit: 8 },
		]);
		res.status(200).json(results);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getNewReleases = async (req, res) => {
	const songs = await Song.find({});
	const result = songs.slice(-11, -1);
	const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));
	res.status(200).json(shuffledSongs);
};

const getRandom = async (req, res) => {
	const songs = await Song.find({});
	const shuffledSongs = songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
	const result = shuffledSongs.slice(-11, -1);
	res.status(200).json(result);
};

const getAroundYou = async (req, res) => {
	const songs = await Song.find({});
	const result = songs.slice(0, 11);
	const shuffledSongs = result.sort(() => (Math.random() > 0.5 ? 1 : -1));
	res.status(200).json(shuffledSongs);
};

const likeSong = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user.id;
		const song = await Song.findById(id);
		const user = await User.findById(userId);

		if (!user || !song) {
			return res.status(404).json({ message: "User or Song not found!" });
		}

		const isLiked = song.likes.get(userId);
		if (isLiked) {
			song.likes.delete(userId);
			user.favorites = user.favorites.filter((songId) => songId !== id);
		} else {
			song.likes.set(userId, true);
			user.favorites.push(id);
		}

		const savedSong = await song.save();
		const savedUser = await user.save();

		const returnUser = {
			id: savedUser.id,
			username: savedUser.username,
			favorites: savedUser.favorites,
			playlists: savedUser.playlists,
		};

		res.status(200).json(returnUser);
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

export {
	getSongs,
	addSong,
	getTopSongs,
	getNewReleases,
	getRandom,
	getAroundYou,
	likeSong,
};

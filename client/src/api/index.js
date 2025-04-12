import axios from "axios";

export const client = axios.create({
	baseURL: "https://music-app-9b75.onrender.com/api/",
});

import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { MusicPlayer } from "../components/MusicPlayer/index.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeLayout = () => {
	const { currentTrack } = useSelector((state) => state.player);
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Grid
			position="relative"
			templateColumns={{ base: "1fr", md: "repeat(10, 1fr)" }}
			bg="blackAlpha.900"
			color="#e3e3e3"
			h="100vh">
			{/* Sidebar (Navbar) */}
			<GridItem colSpan={{ base: 1, md: 2 }} p={4}>
				<Navbar />
			</GridItem>

			{/* Main Content */}
			<GridItem
				colSpan={{ base: 1, md: 8 }}
				minH="calc(100vh - 60px)" // Ensures content height adjusts without overlapping music player
				overflowY="auto" // Allows scrolling of content
				p={{ base: 2, md: 6 }}>
				<Outlet />
			</GridItem>

			{/* Music Player */}
			{currentTrack && (
				<GridItem
					colSpan={10}
					position="absolute"
					bottom={0}
					left={0}
					w="full"
					bg="zinc.800"
					borderTop="1px solid #444"
					zIndex={10}>
					<MusicPlayer />
				</GridItem>
			)}
		</Grid>
	);
};

export default HomeLayout;

import { BiMenuAltRight, BiMusic } from "react-icons/bi";
import { AiFillHeart, AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { HiOutlineUserCircle, HiViewGrid } from "react-icons/hi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Hide,
	Show,
	Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { resetPlayer } from "../redux/slices/playerSlice";
import { useEffect, useState } from "react";

const MobileNav = () => {
	const [navIsOpen, setNavIsOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		setNavIsOpen(false);
	}, [pathname]);

	const toggleNav = () => {
		setNavIsOpen(!navIsOpen);
	};

	return (
		<Box
			position="sticky"
			top={0}
			zIndex={30}
			w="full"
			bg="zinc.950"
			pb={navIsOpen ? 4 : 0}
			borderBottom="1px solid"
			borderColor="zinc.700">
			<Flex align="center" justify="space-between" p={2}>
				<Link to="/home">
					<Flex color="accent.main" align="center" gap={4}>
						<BiMusic color="inherit" size={30} />
						<Heading as="h1" fontWeight="semibold" fontSize="2xl">
							BeatBox
						</Heading>
					</Flex>
				</Link>
				<Button variant="unstyled" onClick={toggleNav}>
					{navIsOpen ? <TiTimes size={24} /> : <BiMenuAltRight size={24} />}
				</Button>
			</Flex>
			{navIsOpen && (
				<Box px={4} pt={2}>
					<NavContent />
				</Box>
			)}
		</Box>
	);
};

const DesktopNav = () => {
	return (
		<Box
			position="sticky"
			top={0}
			minW={{ base: "full", md: "5rem", lg: "6rem" }}
			minH="100vh"
			borderRight="1px"
			borderRightColor="zinc.600"
			bg="zinc.900"
			px={4}
			py={6}>
			<Flex direction="column" h="full">
				<Flex color="accent.main" align="center" gap={4} mb={8}>
					<BiMusic color="inherit" size={30} />
					<Heading as="h1" fontWeight="semibold" fontSize="2xl">
						BeatBox
					</Heading>
				</Flex>
				<NavContent />
			</Flex>
		</Box>
	);
};

const NavContent = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(resetPlayer());
		dispatch(logoutUser());
		navigate("/auth/login");
	};

	const gotoLogin = () => {
		dispatch(resetPlayer());
		navigate("/auth/login");
	};

	const navLinks = [
		{ label: "Home", icon: <AiFillHome size={20} />, to: "/home" },
		{ label: "Browse", icon: <HiViewGrid size={20} />, to: "/library" },
		{ label: "Playlists", icon: <BsHeadphones size={20} />, to: "/playlists" },
		{ label: "Favorites", icon: <AiFillHeart size={20} />, to: "/favorites" },
	];

	return (
		<Box>
			<Flex direction="column" gap={2}>
				{navLinks.map(({ label, icon, to }) => (
					<NavLink to={to} key={label}>
						{({ isActive }) => (
							<Button
								bg={isActive ? "accent.main" : "transparent"}
								_hover={
									isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
								}
								rounded="base"
								display="inline-flex"
								alignItems="center"
								justifyContent="flex-start"
								gap={6}
								py={6}
								px={4}
								w="full">
								{icon}
								<span>{label}</span>
							</Button>
						)}
					</NavLink>
				))}
			</Flex>
			<Divider
				bg="zinc.500"
				border="0"
				my={6}
				h="1px"
			/>
			<Box>
				{user ? (
					<Box p={3}>
						<Flex align="center" gap={4} color="accent.light">
							<HiOutlineUserCircle size={20} color="inherit" />
							<Text fontSize="sm">{user?.username}</Text>
						</Flex>
						<Button
							onClick={handleLogout}
							mt={4}
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							fontWeight={400}
							gap={3}>
							<AiOutlineLogout size={20} /> Logout
						</Button>
					</Box>
				) : (
					<Button
						onClick={gotoLogin}
						variant="unstyled"
						rounded="base"
						w="full"
						border="1px"
						borderColor="zinc.600"
						fontSize="sm"
						py={2}
						px={5}>
						Login
					</Button>
				)}
			</Box>
		</Box>
	);
};

const Navbar = () => {
	return (
		<>
			<Show above="md">
				<DesktopNav />
			</Show>
			<Hide above="md">
				<MobileNav />
			</Hide>
		</>
	);
};

export default Navbar;

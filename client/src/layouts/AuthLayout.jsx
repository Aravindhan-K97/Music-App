import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { BiMusic } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/home");
		}
	}, [user, navigate]);

	return (
		<main>
			{/* Header */}
			<Flex
				align="center"
				justify="flex-start"
				bg="zinc.800"
				p={4}
				pl={6}
				h={{ base: "4rem", md: "5rem" }} // Adjusted for responsiveness
				position="fixed"
				top={0}
				left={0}
				w="full"
				zIndex={10}>
				<Flex align="center" color="accent.main" justify="flex-start" gap={2}>
					<BiMusic size={30} />
					<Heading
						fontWeight="semibold"
						color="gray.200"
						fontSize={{ base: "lg", md: "2xl" }}>
						BeatBox
					</Heading>
				</Flex>
			</Flex>

			{/* Main content */}
			<Box bg="zinc.950" minH="calc(100vh - 5rem)" pt="5rem"> {/* Adjusted for header spacing */}
				<Outlet />
			</Box>
		</main>
	);
};

export default AuthLayout;

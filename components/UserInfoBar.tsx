import {
	Box,
	Flex,
	IconButton,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Text,
	Tooltip,
	Icon,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { GoSettings } from "react-icons/go";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

type Props = {};

const UserInfoBar = (props: Props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { user, userLoading, logout } = useAuth();

	const Avatar = () => {
		if (userLoading) {
			return <SkeletonCircle size="12" />;
		}
		return <SkeletonCircle size="12" />;
	};

	const DisplayName = () => {
		if (userLoading) {
			return <Skeleton h={5} w={"40"} />;
		}
		return (
			<Tooltip
				label={`${user?.username}#${user?.uniqueNumber}`}
				aria-label="Username tooltip"
			>
				<Flex>
					<Text fontSize="lg" noOfLines={1}>
						{user?.username}
					</Text>
					<Text fontSize="lg" textColor="gray.500">
						#{user?.uniqueNumber}
					</Text>
				</Flex>
			</Tooltip>
		);
	};

	return (
		<Flex
			alignItems="center"
			justifyContent="space-between"
			bg="blackAlpha.300"
			px="5"
			py="3"
		>
			<Flex alignItems="center">
				<Avatar />
				<Box mx="3">
					<DisplayName />
				</Box>
			</Flex>
			<Menu>
				<MenuButton
					as={IconButton}
					icon={<Icon as={GoSettings as any} />}
					variant="outline"
					colorScheme="teal"
					aria-label="Settings"
				>
					Actions
				</MenuButton>
				<MenuList>
					<MenuItem onClick={logout}>Logout </MenuItem>
					<MenuItem
						closeOnSelect={false}
						aria-label="Toggle Color Mode"
						onClick={toggleColorMode}
						display="flex"
						alignItems="center"
					>
						{colorMode === "light" ? (
							<>
								<BsMoonStarsFill />
								<Text mx="2">Dark mode</Text>
							</>
						) : (
							<>
								<BsSun />
								<Text mx="2">Light mode</Text>
							</>
						)}
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default UserInfoBar;

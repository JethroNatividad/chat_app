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
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { GoSettings } from "react-icons/go";

type Props = {};

const UserInfoBar = (props: Props) => {
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
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default UserInfoBar;

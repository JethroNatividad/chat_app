import {
	Box,
	Flex,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";

type Props = {};

const UserInfoBar = (props: Props) => {
	const { user, userLoading } = useAuth();

	const Avatar = () => {
		if (userLoading) {
			return <SkeletonCircle size="12" />;
		}
		return <SkeletonCircle size="12" />;
	};

	const DisplayName = () => {
		if (userLoading) {
			return <Skeleton h={5} />;
		}
		return (
			<Tooltip
				label={`${user?.username}#${user?.uniqueNumber}`}
				aria-label="Username tooltip"
			>
				<Flex overflow="hidden">
					<Text fontSize="lg">{user?.username}</Text>
					<Text fontSize="lg" textColor="gray.500">
						#{user?.uniqueNumber}
					</Text>
				</Flex>
			</Tooltip>
		);
	};

	return (
		<Flex alignItems="center" bg="blackAlpha.300" px="5" py="3">
			<Avatar />
			<Box width={28} mx="4">
				<DisplayName />
			</Box>
		</Flex>
	);
};

export default UserInfoBar;

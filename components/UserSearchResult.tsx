import Image from "next/image";
import React from "react";
import useUser from "../hooks/useUser";
import {
	checkIfAlreadyInChatGroup,
	createChatGroup,
} from "../lib/functions/chats";
import { User } from "../types/User";

type Props = {
	profilePicture: string;
	username: string;
	uniqueNumber: number;
	userId: string;
	setOpenChatGroupId: (chatGroupId: string) => void;
	setSearchResults: (users: User[]) => void;
};

const UserSearchResult = ({
	profilePicture,
	uniqueNumber,
	username,
	userId,
	setOpenChatGroupId,
	setSearchResults,
}: Props) => {
	const handleClick = async () => {
		const alreadyInChatGroup = await checkIfAlreadyInChatGroup(userId);
		if (alreadyInChatGroup) {
			setSearchResults([]);
			return setOpenChatGroupId(alreadyInChatGroup);
		}
		return await createChatGroup([userId]);
	};

	return (
		<div
			onClick={handleClick}
			className="flex bg-gray-100 cursor-pointer hover:bg-gray-200 px-3 py-2 items-center space-x-2 "
		>
			<div className="h-10 w-10 rounded-3xl bg-white relative overflow-hidden">
				<Image
					alt={username}
					src={profilePicture}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="flex items-center space-x-1">
				<p className="text-white font-semibold text-md">{username}</p>
				<p className="text-gray-50 font-semibold text-md">#{uniqueNumber}</p>
			</div>
		</div>
	);
};

export default UserSearchResult;

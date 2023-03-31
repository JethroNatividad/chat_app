import { Box } from '@chakra-ui/react';
import React from 'react';
import { useChat } from '../context/ChatContext';
import Chat, { ChatLoading } from './Chat';

type Props = {};

const ChatList = (props: Props) => {
	const { chatList, chatListLoading } = useChat();
	return (
		<div>
			{chatListLoading ? (
				<Box>
					{[...Array(5)].map((_, i) => (
						<ChatLoading key={i} />
					))}
				</Box>
			) : (
				<Box>
					{chatList.map((chat) => (
						<Chat {...chat} key={chat.id} />
					))}
				</Box>
			)}
		</div>
	);
};

export default ChatList;

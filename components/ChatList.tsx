import { Box } from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'
import Chat, { ChatSkeleton } from './Chat'

const ChatList = () => {
	const { chatList, chatListLoading } = useChat()
	return (
		<div>
			{chatListLoading ? (
				<Box>
					{[...Array(5)].map((_, i) => (
						<ChatSkeleton key={i} />
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
	)
}

export default ChatList

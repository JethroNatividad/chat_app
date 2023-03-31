import {
	Box,
	Flex,
	Image,
	Skeleton,
	SkeletonCircle,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'
import { PopulatedChatGroup } from '../types/Chats'

interface Props extends PopulatedChatGroup { }

export const ChatLoading = () => {
	return (
		<Flex
			cursor='pointer'
			px='4'
			py='2'
			alignItems='center'
			_hover={{
				bg: 'blackAlpha.100',
			}}
		>
			<SkeletonCircle size='12' />
			<Box ml={2}>
				<Skeleton mb={3} h={3} w={'40'} />
				<Skeleton h={2} w={'40'} />

				{/* <Text minH="1.5rem" fontSize="base" noOfLines={1}>{recentMessage?.messageText}</Text> */}
			</Box>
		</Flex>
	)
}

const Chat = ({ recentMessage, id, members }: Props) => {
	const { setActiveChatId, activeChatId } = useChat()

	const handleClick = () => {
		if (activeChatId === id) return
		setActiveChatId(id)
		console.log('Clicked on chat', id)
	}
	const memberNames = members.map((member) => member.username).join(', ')
	return (
		<Flex
			bg={activeChatId === id ? 'blackAlpha.100' : ''}
			onClick={handleClick}
			cursor='pointer'
			px='4'
			py='2'
			alignItems='center'
			_hover={{
				bg: 'blackAlpha.100',
			}}
		>
			<Image
				borderRadius='full'
				boxSize='46px'
				src={members[1].profilePicture}
				alt='Profile Picture'
				mr='3'
			/>
			<Box>
				<Text fontSize='lg'>{memberNames}</Text>
				<Text minH='1.5rem' fontSize='base' noOfLines={1}>
					{recentMessage?.messageText}
				</Text>
			</Box>
		</Flex>
	)
}

export default Chat

import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Interface } from 'readline/promises'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'
import { PopulatedChatGroup } from '../types/Chats'

interface Props extends PopulatedChatGroup { }

const Chat = ({ recentMessage, id, members }: Props) => {
    const { user } = useAuth()
    const { setActiveChatId, activeChat } = useChat()

    const handleClick = () => {
        if (activeChat?.id === id) return;
        setActiveChatId(id);
        console.log("Clicked on chat", id)
    }
    const memberNames = members.map((member) => member.username).join(", ")
    return (
        <Flex bg={activeChat?.id === id ? 'blackAlpha.100' : ''} onClick={handleClick} cursor="pointer" px='4' py='2' alignItems="center" _hover={
            {
                bg: 'blackAlpha.100'
            }
        }>
            <Image
                borderRadius='full'
                boxSize='46px'
                src={members[1].profilePicture}
                alt='Profile Picture'
                mr='3'
            />
            <Box>
                <Text fontSize="lg">{memberNames}</Text>
                <Text minH="1.5rem" fontSize="base" noOfLines={1}>{recentMessage?.messageText}</Text>
            </Box>
        </Flex>
    )
}

export default Chat
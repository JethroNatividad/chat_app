import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'

type Props = {}

const ChatView = (props: Props) => {
    const { activeChat, activeChatLoading, chatList } = useChat()
    const memberNames = activeChat?.members.map((member) => member.username).join(", ");

    return (
        <Box>
            <Flex alignItems="center" px="5" shadow='lg' minH="14">
                <Text fontSize="xl">
                    {memberNames}
                </Text>
            </Flex>
        </Box>
    )
}

export default ChatView
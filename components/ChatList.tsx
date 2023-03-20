import { Box } from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'
import Chat from './Chat'

type Props = {}

const ChatList = (props: Props) => {
    const { chatList, chatListLoading } = useChat()
    return (
        <div>{chatListLoading ? "Loading..." : (
            <Box>
                {chatList.map((chat) => (<Chat {...chat} />))}
            </Box>
        )}</div>
    )
}

export default ChatList
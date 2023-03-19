import React from 'react'
import { useChat } from '../context/ChatContext'

type Props = {}

const ChatList = (props: Props) => {
    const { chatList, chatListLoading } = useChat()
    return (
        <div>{chatListLoading ? "Loading..." : JSON.stringify(chatList)}</div>
    )
}

export default ChatList
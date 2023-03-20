import React from 'react'
import { Interface } from 'readline/promises'
import { useAuth } from '../context/AuthContext'
import { PopulatedChatGroup } from '../types/Chats'

interface Props extends PopulatedChatGroup { }

const Chat = ({ recentMessage, id, members }: Props) => {
    const { user } = useAuth()
    const memberNames = members.map((member) => member.username).join(", ")
    return (
        <div>{memberNames}</div>
    )
}

export default Chat
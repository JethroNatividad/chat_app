import { ArrowLeftIcon, MenuIcon, PaperAirplaneIcon, UserAddIcon } from '@heroicons/react/solid'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { sendMessage } from '../lib/functions/chats'
import { messagesRef } from '../lib/refs/Chats'
import { ChatGroup, Message as MessageType } from '../types/Chats'
import Message from './Message'

type Props = {
    openChatGroupId: string
    setOpenChatGroupId: (chatGroupId: string | null) => void
}

const ChatView = ({ openChatGroupId, setOpenChatGroupId }: Props) => {

    const [messages, setMessages] = useState<MessageType[]>([])
    const [input, setInput] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(query(messagesRef(openChatGroupId), orderBy('sentAt', 'asc')), (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data() as MessageType)
            setMessages(data)
        })
        return () => {
            unsubscribe()
        }
    }, [openChatGroupId])

    const handleSendMessage = async () => {
        setInput('')
        await sendMessage(openChatGroupId, input)
    }

    return (
        <div className='h-full w-full bg-primary-dark flex flex-col'>
            {/* Header */}
            <div className='h-16 w-full shadow-md flex items-center px-5 justify-between'>
                <div className='flex items-center space-x-5'>
                    <div className="flex md:hidden text-white cursor-pointer" onClick={() => setOpenChatGroupId(null)}>
                        <ArrowLeftIcon className='h-8 w-8' />
                    </div>
                    <h1 className='text-white text-xl font-semibold'>Username</h1>
                </div>
                <div className='h-10 w-10 text-white'>
                    <UserAddIcon />
                </div>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-scroll'>
                {messages.map((message) => (
                    <Message key={message.sentAt.toString()} userId={message.sentBy} message={message.messageText} timestamp={message.sentAt} />
                ))}
            </div>

            {/* Chat input */}
            <div className='h-16 px-5 flex items-center'>
                <div className='bg-gray-500 h-2/3 shadow-lg w-full rounded-lg overflow-hidden flex px-2 items-center'>
                    <input value={input} onChange={handleInputChange} className='w-full h-full outline-none bg-inherit text-white placeholder:text-white' type='text' placeholder='Type a message' />
                    <div onClick={handleSendMessage} className='h-9 w-9 rotate-90 text-white cursor-pointer'>
                        <PaperAirplaneIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatView
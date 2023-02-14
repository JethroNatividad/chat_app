import { ArrowLeftIcon, MenuIcon, PaperAirplaneIcon, UserAddIcon } from '@heroicons/react/solid'
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import useChatScroll from '../hooks/useChatScoll'
import { auth } from '../lib/firebase'
import { sendMessage } from '../lib/functions/chats'
import { populateUserId } from '../lib/functions/user'
import { chatGroupRef, messagesRef } from '../lib/refs/Chats'
import { ChatGroup, Message as MessageType, PopulatedChatGroup } from '../types/Chats'
import { User } from '../types/User'
import Message from './Message'

type Props = {
    openChatGroupId: string
    setOpenChatGroupId: (chatGroupId: string | null) => void
}

const ChatView = ({ openChatGroupId, setOpenChatGroupId }: Props) => {
    const currentUser = auth.currentUser
    const [messages, setMessages] = useState<MessageType[]>([])
    const [input, setInput] = useState<string>('')
    const [data, setData] = useState<PopulatedChatGroup>()
    const ref = useChatScroll(messages)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(chatGroupRef(openChatGroupId), async (snapshot) => {
            const data = snapshot.data()

            if (data && currentUser) {
                // const filteredMembers = data.members.filter((id) => id !== currentUser.uid)
                // const currentMember = await populateUserId(filteredMembers[0])
                const members: User[] = []

                data.members.forEach(async (id) => {
                    if (id !== currentUser.uid) {
                        const member = await populateUserId(id)
                        if (member)
                            members.push(member)
                    }
                })
                console.log(members, 'members')
                if (members)
                    setData({ ...data, members })
            }
        })
        return () => {
            unsubscribe()
        }
    }, [openChatGroupId])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(messagesRef(openChatGroupId), orderBy('sentAt', 'asc')), (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data() as MessageType)
            setMessages(data)
        })
        return () => {
            unsubscribe()
        }
    }, [openChatGroupId])

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInput('')
        await sendMessage(openChatGroupId, input)
    }

    return (
        <div className='h-full w-full bg-primary-dark flex flex-col'>
            {/* Header */}
            <div className='h-16 w-full shadow-md flex items-center px-5 justify-between'>
                <div className='flex items-center space-x-5 md:space-x-0'>
                    <div className="flex md:hidden text-white cursor-pointer" onClick={() => setOpenChatGroupId(null)}>
                        <ArrowLeftIcon className='h-8 w-8' />
                    </div>
                    <h1 className='text-white text-xl font-semibold'>{data?.members[0]?.username}</h1>
                </div>
                <div className='h-10 w-10 text-white'>
                    <UserAddIcon />
                </div>
            </div>

            {/* Messages */}
            <div ref={ref} className='flex-1 overflow-y-scroll'>
                {messages.map((message) => (
                    <Message key={message.sentAt.toString()} profilePicture={message.sentBy === currentUser?.uid ? currentUser.photoURL : data?.members.find(user => user.uid === message.sentBy)?.profilePicture} userId={message.sentBy} message={message.messageText} timestamp={message.sentAt} />
                ))}
            </div>

            {/* Chat input */}
            <div className='h-16 px-5 flex items-center'>
                <form className='bg-gray-500 h-2/3 shadow-lg w-full rounded-lg overflow-hidden flex px-2 items-center' onSubmit={handleSendMessage}>
                    <input value={input} onChange={handleInputChange} className='w-full h-full outline-none bg-inherit text-white placeholder:text-white' type='text' placeholder='Type a message' />
                    <button type="submit" >
                        <PaperAirplaneIcon className='h-9 w-9 rotate-90 text-white' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatView
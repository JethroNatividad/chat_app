import { getDoc, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser'
import { populateUserId, populateUserIds } from '../lib/functions/user'
import { chatGroupRef } from '../lib/refs/Chats'
import { userRef } from '../lib/refs/User'
import { ChatGroup, PopulatedChatGroup } from '../types/Chats'
import { User } from '../types/User'

type Props = {
    chatGroupId: string
    openChatGroupId: string | null
    setOpenChatGroupId: (chatGroupId: string) => void
}

const ChatItem = ({ chatGroupId, openChatGroupId, setOpenChatGroupId }: Props) => {
    const [data, setData] = useState<PopulatedChatGroup>()
    const active = openChatGroupId === chatGroupId
    const handleClick = () => {
        if (!active) setOpenChatGroupId(chatGroupId)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(chatGroupRef(chatGroupId), async (snapshot) => {
            const data = snapshot.data()
            if (data) {
                const currentMember = await populateUserId(data.members[0])
                console.log(currentMember, 'members')
                if (currentMember)
                    setData({ ...data, members: [currentMember] })
            }
        })
        return () => {
            unsubscribe()
        }
    }, [chatGroupId])


    return (
        <div onClick={handleClick} className={`${active ? 'bg-gray-100' : 'hover:bg-gray-200'} flex space-x-2 items-center p-2 cursor-pointer rounded-lg`}>
            <div className='h-9 w-9 rounded-3xl bg-white relative overflow-hidden' >
                {
                    data?.members[0]?.profilePicture ? (
                        <Image src={data?.members[0]?.profilePicture} layout="fill" objectFit='cover' />
                    ) : null
                }
            </div>
            <div className='flex flex-col justify-center flex-1'>
                <p className='text-white font-semibold text-md'>{data?.members[0]?.username}</p>
                <p className='text-white text-xs line-clamp-1'>
                    {data?.recentMessage?.messageText}
                </p>
            </div>
        </div>
    )
}

export default ChatItem
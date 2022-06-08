import { getDoc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser'
import { chatGroupRef } from '../lib/refs/Chats'
import { userRef } from '../lib/refs/User'
import { PopulatedChatGroup } from '../types/Chats'
import { User } from '../types/User'

type Props = {

    chatGroupId: string
}

const ChatItem = ({ chatGroupId }: Props) => {
    const [data, setData] = useState<PopulatedChatGroup>()
    const [loading, setLoading] = useState(true)
    const currentUser = useUser()

    useEffect(() => {
        const unsubscribe = onSnapshot(chatGroupRef(chatGroupId), (snapshot) => {
            const data = snapshot.data()
            setLoading(false)
            if (!data) return setData(undefined)
            const populatedMembers: User[] = []
            data.members.forEach(async (memberId) => {
                // check if memberid is current user id
                if (currentUser && currentUser.uid === memberId) return
                const member = (await getDoc(userRef(memberId))).data()
                if (member) return populatedMembers.push(member)
            })
            return setData({ ...data, members: populatedMembers })
        })
        return () => {
            unsubscribe()
        }
    }, [chatGroupId, currentUser])

    return (
        <div className='flex space-x-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg'>
            <div className='h-9 w-9 rounded-3xl bg-white' />
            <div className='flex flex-col justify-center flex-1'>
                <p className='text-white font-semibold text-md'>{data?.members.map((user) => `${user.username} `)}</p>
                <p className='text-white text-xs line-clamp-1'>
                    {data?.recentMessage?.messageText}
                </p>
            </div>
        </div>
    )
}

export default ChatItem
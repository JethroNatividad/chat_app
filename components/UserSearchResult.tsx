import Image from 'next/image'
import React from 'react'
import useUser from '../hooks/useUser'
import { createChatGroup } from '../lib/functions/chats'

type Props = {
    profilePicture: string
    username: string
    uniqueNumber: number
    userId: string
}

const UserSearchResult = ({ profilePicture, uniqueNumber, username, userId }: Props) => {
    const currentUser = useUser()

    const handleClick = async () => {
        console.log('clicked')
        if (currentUser) {
            console.log('HERE')
            await createChatGroup([userId, currentUser.uid])
        }
    }

    return (
        <div onClick={handleClick} className='flex bg-gray-100 cursor-pointer hover:bg-gray-200 px-3 py-2 items-center space-x-2 '>
            <div className='h-10 w-10 rounded-3xl bg-white relative overflow-hidden'>
                <Image src={profilePicture} layout="fill" objectFit='cover' />
            </div>
            <div className='flex items-center space-x-1'>
                <p className='text-white font-semibold text-md'>{username}</p>
                <p className='text-gray-50 font-semibold text-md'>#{uniqueNumber}</p>
            </div>
        </div>
    )
}

export default UserSearchResult
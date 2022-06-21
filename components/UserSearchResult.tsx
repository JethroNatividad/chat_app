import Image from 'next/image'
import React from 'react'

type Props = {
    profilePicture: string
    username: string
    uniqueNumber: number
}

const UserSearchResult = ({ profilePicture, uniqueNumber, username }: Props) => {
    return (
        <div className='flex bg-gray-100 cursor-pointer hover:bg-gray-200 px-3 py-2 items-center space-x-2 '>
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
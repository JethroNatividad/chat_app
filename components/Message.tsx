import { FieldValue, Timestamp } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { populateUserId } from '../lib/functions/user'
import { User } from '../types/User'
import moment from 'moment'

type Props = {
    timestamp: Timestamp
    message: string
    userId: string
    profilePicture: string | null | undefined
}

const Message = ({ message, userId, timestamp, profilePicture }: Props) => {
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        const fn = async () => {
            const userData = await populateUserId(userId)
            setUser(userData)
        }
        fn()
    }, [])



    return (
        <div className='flex space-x-2 px-5 py-1 hover:bg-gray-300 group'>
            <div className='h-9 w-9 rounded-3xl bg-white relative overflow-hidden' >
                {
                    profilePicture ? (
                        <Image src={profilePicture} layout="fill" objectFit='cover' />
                    ) : null
                }
            </div>
            <div className='flex-1'>
                <div className='flex items-baseline space-x-2'>
                    <h1 className='text-white text-lg'>{user?.username}</h1>
                    <p className='text-xs text-slate-300'>{moment(timestamp.toDate()).calendar()}</p>
                </div>
                <div className='text-slate-200'>{message}</div>
            </div>
        </div>
    )
}

export default Message
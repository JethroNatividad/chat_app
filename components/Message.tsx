import { FieldValue } from 'firebase/firestore'
import React from 'react'

type Props = {
    timestamp: FieldValue
    message: string
    userId: string
}

const Message = ({ message }: Props) => {
    return (
        <div className='flex space-x-2 px-5 py-1 hover:bg-gray-300 group'>
            <div className='h-12 w-12 rounded-3xl bg-white relative overflow-hidden' />
            <div className='flex-1'>
                <div className='flex items-baseline space-x-2'>
                    <h1 className='text-white text-lg'>Username</h1>
                    <p className='text-xs text-slate-300'>Today at 1:00 PM</p>
                </div>
                <div className='text-slate-200'>{message}</div>
            </div>
        </div>
    )
}

export default Message
import React from 'react'

type Props = {
    username: string
    recentMessage: string
}

const ChatItem = ({ username, recentMessage }: Props) => {
    return (
        <div className='flex space-x-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg'>
            <div className='h-9 w-9 rounded-3xl bg-white' />
            <div className='flex flex-col justify-center'>
                <p className='text-white font-semibold text-md'>{username}</p>
                <p className='text-white text-xs'>
                    {recentMessage}
                </p>
            </div>
        </div>
    )
}

export default ChatItem
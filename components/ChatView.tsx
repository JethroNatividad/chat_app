import { UserAddIcon } from '@heroicons/react/solid'
import React from 'react'

type Props = {
    openChatGroupId: string | null
}

const ChatView = (props: Props) => {
    if (props.openChatGroupId === null) return (
        <div className='h-full w-full bg-primary-dark flex items-center justify-center'>
            <h1 className='text-white text-lg font-semibold'>Open or start a new conversation</h1>
        </div>
    )
    return (
        <div className='h-full w-full bg-primary-dark'>
            <div className='h-16 w-full shadow-md flex items-center px-5 justify-between'>
                <h1 className='text-white text-xl font-semibold'>Username</h1>
                <div className='h-10 w-10 text-white'>
                    <UserAddIcon />
                </div>
            </div>
        </div>
    )
}

export default ChatView
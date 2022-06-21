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
            <div>Header</div>
        </div>
    )
}

export default ChatView
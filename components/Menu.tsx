import React from 'react'

type Props = {}

const Menu = (props: Props) => {
    return (
        <div className='w-full flex flex-col justify-between h-full bg-secondary-dark'>
            {/* Header */}
            <div className='w-full flex flex-col justify-center px-2 shadow-md h-16'>
                <input type='text' placeholder='Test' className='input bg-primary-dark text-white placeholder:text-white ring-gray-500' />
            </div>

            {/* Chat list */}
            <div className='flex-1'>Chat list</div>

            {/* User bar */}
            <div className='w-full h-16 bg-gray-900'>

            </div>
        </div>
    )
}

export default Menu
import React from 'react'
import { CogIcon, UsersIcon } from '@heroicons/react/solid'
import useUser from '../hooks/useUser'

import Image from 'next/image'

const Menu = () => {
	const currentUser = useUser()
	console.log(currentUser)
	// const chatGroupIds: string[] = currentUser?.chatGroups ?? [];
	return (
		<div className='w-full flex flex-col justify-between h-full bg-secondary-dark'>
			{/* Header */}
			<div className='w-full flex flex-col justify-center px-2 shadow-md h-16'>
				{/* <SearchBar openChatGroupId={openChatGroupId} setOpenChatGroupId={setOpenChatGroupId} /> */}
			</div>

			{/* Chat list */}
			<div className='flex-1 p-2'>
				{/* {chatGroupIds.map((chatGroupId) => (
                    <ChatItem key={chatGroupId} chatGroupId={chatGroupId} openChatGroupId={openChatGroupId} setOpenChatGroupId={setOpenChatGroupId} />
                ))} */}
			</div>

			{/* User bar */}
			<div className='w-full flex h-16 justify-between bg-gray-900 px-2'>
				<div className='flex h-full space-x-2 items-center justify-center w-fit'>
					<div className='h-10 w-10 rounded-3xl bg-white relative overflow-hidden'>
						{currentUser?.profilePicture ? (
							<Image
								alt={currentUser.username}
								src={currentUser.profilePicture}
								layout='fill'
								objectFit='cover'
							/>
						) : null}
					</div>
					<div className='flex flex-1 justify-center items-center space-x-2'>
						<p className='text-white w-fit font-semibold text-md'>
							{currentUser?.username}
						</p>
						<p className='text-md font-semibold text-gray-500'>
							#{currentUser?.uniqueNumber}
						</p>
					</div>
				</div>
				<div className='flex items-center space-x-3'>
					<UsersIcon className='h-10 w-10 text-gray-50 cursor-pointer' />
					<CogIcon className='h-10 w-10 text-gray-50 cursor-pointer' />
				</div>
			</div>
		</div>
	)
}

export default Menu

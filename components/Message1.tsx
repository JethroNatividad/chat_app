import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'

import moment from 'moment'

type Props = {
	timestamp: Timestamp;
	message: string;
	userId: string;
	profilePicture: string | null | undefined;
	username: string;
};

const Message = ({
	message,
	timestamp,
	profilePicture,
	username,
}: Props) => {
	return (
		<div className='flex space-x-2 px-5 py-1 hover:bg-gray-300 group'>
			<div className='h-9 w-9 rounded-3xl bg-white relative overflow-hidden'>
				{profilePicture ? (
					<Image
						src={profilePicture}
						alt={username}
						layout='fill'
						objectFit='cover'
					/>
				) : null}
			</div>
			<div className='flex-1'>
				<div className='flex items-baseline space-x-2'>
					<h1 className='text-white text-lg'>{username}</h1>
					<p className='text-xs text-slate-300'>
						{moment(timestamp.toDate()).calendar()}
					</p>
				</div>
				<div className='text-slate-200'>{message}</div>
			</div>
		</div>
	)
}

export default Message

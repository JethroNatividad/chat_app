import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { searchUsers } from '../lib/functions/user'
import { User } from '../types/User'

type Props = {}

const SearchBar = (props: Props) => {
    const [searchText, setSearchText] = useState<string>('')
    const [searchResults, setSearchResults] = useState<User[]>([])

    useEffect(() => {
        const fn = async () => {

            if (searchText.length > 0) {
                const results = await searchUsers(searchText)
                return setSearchResults(results)
            }
            setSearchResults([])
        }
        fn()
    }, [searchText])

    // {"uniqueNumber":2,"username":"Jethro","following":[],"email":"kel73896@gmail.com","followers":[],"uid":"GXn7G4cupjP5YwGXWUOkLCxwSPK2","chatGroups":[], profilePicture: ""}
    return (
        <div className='relative'>
            <input onChange={(e) => {
                setSearchText(e.currentTarget.value)
            }} value={searchText} type='text' placeholder='Search users' className='input bg-primary-dark text-white placeholder:text-white ring-gray-500 w-full' />

            <div className='absolute top-14 left-0 w-full'>
                {searchResults.map((user) => (
                    <div className='flex bg-gray-100 cursor-pointer hover:bg-gray-200 px-3 py-2 items-center space-x-2 '>
                        <div className='h-10 w-10 rounded-3xl bg-white relative overflow-hidden'>
                            <Image src={user.profilePicture} layout="fill" objectFit='cover' />
                        </div>
                        <div className='flex items-center space-x-1'>
                            <p className='text-white font-semibold text-md'>{user.username}</p>
                            <p className='text-gray-50 font-semibold text-md'>#{user.uniqueNumber}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
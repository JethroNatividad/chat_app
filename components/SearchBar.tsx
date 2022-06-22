import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { searchUsers } from '../lib/functions/user'
import { User } from '../types/User'
import UserSearchResult from './UserSearchResult'

type Props = {
    openChatGroupId: string | null
    setOpenChatGroupId: (chatGroupId: string) => void
}

const SearchBar = ({ setOpenChatGroupId }: Props) => {
    const [searchText, setSearchText] = useState<string>('')
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [timeouts, setTimeouts] = useState<NodeJS.Timeout>()

    useEffect(() => {
        const fn = async () => {
            if (searchText !== '') {
                const results = await searchUsers(searchText)
                if (results) return setSearchResults(results)
            }
            return setSearchResults([])
        }
        clearTimeout(timeouts)

        setTimeouts(setTimeout(() => {
            fn()
        }, 1000))
    }, [searchText])

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }



    // {"uniqueNumber":2,"username":"Jethro","following":[],"email":"kel73896@gmail.com","followers":[],"uid":"GXn7G4cupjP5YwGXWUOkLCxwSPK2","chatGroups":[], profilePicture: ""}
    return (
        <div className='relative'>
            <input onChange={handleSearchTextChange} value={searchText} type='text' placeholder='Search users' className='input bg-primary-dark text-white placeholder:text-white ring-gray-500 w-full' />

            <div className='absolute top-14 left-0 w-full z-10'>
                {searchResults.map((user) => (
                    <UserSearchResult setSearchResults={setSearchResults} setOpenChatGroupId={setOpenChatGroupId} key={user.uid} profilePicture={user.profilePicture} username={user.username} uniqueNumber={user.uniqueNumber} userId={user.uid} />
                ))}
            </div>
        </div>
    )
}

export default SearchBar
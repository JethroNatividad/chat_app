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

    return (
        <div>
            <input onChange={(e) => {
                setSearchText(e.currentTarget.value)
            }} value={searchText} type='text' placeholder='Test' className='input bg-primary-dark text-white placeholder:text-white ring-gray-500' />

            <p>{JSON.stringify(searchResults)}</p>
        </div>
    )
}

export default SearchBar
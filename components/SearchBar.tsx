import React, { useState } from 'react'

type Props = {}

const SearchBar = (props: Props) => {
    const [searchText, setSearchText] = useState<string>('')

    return (
        <div>
            <input onChange={(e) => {
                setSearchText(e.currentTarget.value)
            }} value={searchText} type='text' placeholder='Test' className='input bg-primary-dark text-white placeholder:text-white ring-gray-500' />

            <p>{searchText}</p>
        </div>
    )
}

export default SearchBar
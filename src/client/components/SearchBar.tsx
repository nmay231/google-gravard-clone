import React from 'react'

interface ISearchBarProps {
    search: [string, React.Dispatch<React.SetStateAction<string>>]
}

const SearchBar: React.FC<ISearchBarProps> = ({ search }) => {
    const [searchValue, setSearchValue] = search
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue(e.target.value)
    }
    return <input type="text" value={searchValue} onChange={changeHandler} />
}

export default SearchBar

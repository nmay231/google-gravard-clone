import React, { useState } from 'react'

import { IAPIQuery } from '../App'

type IX = Pick<IAPIQuery, 'born' | 'search' | 'died' | 'category'>

interface ISearchTermsContainerProps {
    query: [IX, React.Dispatch<React.SetStateAction<IX>>]
}

const SearchTermsContainer: React.FC<ISearchTermsContainerProps> = ({
    query: [x, setX],
}) => {
    const [whichSelected, setWhichSelected] = useState<keyof IX>('category')
    const [search, setSearch] = useState('')
    const [isDateBefore, setisDateBefore] = useState(false)

    const handleWhichSelected: React.ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setWhichSelected(e.target.value as keyof IX)
        setSearch('')
        setisDateBefore(e.target.value === 'died')
    }
    const optionGroup = (
        <select
            onChange={handleWhichSelected}
            value={whichSelected}
            className="btn btn-secondary mx-3">
            <option value="search">Keyword</option>
            <option value="born">Date Born</option>
            <option value="died">Date Died</option>
            <option value="category">Category</option>
        </select>
    )

    const addSearchTerm: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        if (whichSelected === 'search') {
            setX({ ...x, search: [...x.search.split(' '), search].join(' ') })
        } else if (whichSelected === 'born') {
            const [after, before] = x.born.split(':')
            if (isDateBefore) setX({ ...x, born: `${after}:${search}` })
            if (!isDateBefore) setX({ ...x, born: `${search}:${before}` })
        } else if (whichSelected === 'died') {
            const [after, before] = x.died.split(':')
            if (isDateBefore) setX({ ...x, died: `${search}:${before}` })
            if (!isDateBefore) setX({ ...x, died: `${after}:${search}` })
        } else {
            setX({ ...x, category: search as IX['category'] })
        }
    }

    const addSearchTermButton = (
        <button
            type="submit"
            className="btn btn-secondary mx-3"
            onClick={addSearchTerm}>
            add!
        </button>
    )

    const handleSelection: React.ChangeEventHandler<HTMLSelectElement &
        HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value)
    }

    const toggleBeforeAfterDate: React.MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        setisDateBefore(!isDateBefore)
    }

    switch (whichSelected) {
        case 'search':
            return (
                <form className="form-inline">
                    {optionGroup}
                    <input
                        onChange={handleSelection}
                        type="text"
                        value={search}
                        className="form-control mx-3"
                    />
                    {addSearchTermButton}
                </form>
            )
        case 'born':
            return (
                <form className="form-inline">
                    {optionGroup}
                    <button
                        type="button"
                        className="btn btn-secondary mx-3"
                        onClick={toggleBeforeAfterDate}>
                        {isDateBefore ? 'Before' : 'After'}
                    </button>
                    <input
                        onChange={handleSelection}
                        type="date"
                        value={search}
                        className="form-control mx-3"
                    />
                    {addSearchTermButton}
                </form>
            )
        case 'died':
            return (
                <form className="form-inline">
                    {optionGroup}
                    <button
                        type="button"
                        className="btn btn-secondary mx-3"
                        onClick={toggleBeforeAfterDate}>
                        {isDateBefore ? 'Before' : 'After'}
                    </button>
                    <input
                        onChange={handleSelection}
                        type="date"
                        value={search}
                        className="form-control mx-3"
                    />
                    {addSearchTermButton}
                </form>
            )
        case 'category':
            if (!search) setSearch('app')
            return (
                <form className="form-inline">
                    {optionGroup}
                    <select
                        onChange={handleSelection}
                        value={search}
                        className="btn btn-secondary mx-3">
                        <option value="app">Apps</option>
                        <option value="hardware">Hardware</option>
                        <option value="service">Services</option>
                    </select>
                    {addSearchTermButton}
                </form>
            )
    }
}

export default SearchTermsContainer

export const ConvertSearchTermsToQuery: (
    any: any
) => Pick<IAPIQuery, 'born' | 'search' | 'died' | 'category'> = (x) => {
    // return { born, died, category, search: keyword }
    throw Error
}

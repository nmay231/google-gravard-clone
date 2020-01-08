import React, { useState, useEffect } from 'react'

import { IAPIQuery } from '../App'
import SearchTermItem from './SearchTermItem'

type IX = Pick<IAPIQuery, 'born' | 'search' | 'died' | 'category'>

interface ISearchTermsContainerProps {
    query: [IX, React.Dispatch<React.SetStateAction<IX>>]
}

const SearchTermsContainer: React.FC<ISearchTermsContainerProps> = ({
    query: [x, setX],
}) => {
    const [whichSelected, setWhichSelected] = useState<keyof IX>('search')
    const [search, setSearch] = useState('')
    const [isDateBefore, setisDateBefore] = useState(false)

    type TSearchTerm = { displayText: string; addTermTo: (val: IX) => IX }
    const [searchTerms, setSearchTerms] = useState<Record<string, TSearchTerm>>(
        {}
    )

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
            setSearchTerms({
                ...searchTerms,
                [`search-${search}`]: {
                    displayText: `Keyword: ${search}`,
                    addTermTo: (x) => ({
                        ...x,
                        search: [...x.search.split(' '), search].join(' '),
                    }),
                },
            })
        } else if (whichSelected === 'born') {
            setSearchTerms({
                ...searchTerms,
                [`born-${isDateBefore}`]: {
                    displayText: `Born ${isDateBefore ? 'before' : 'after'}:
            ${search}`,
                    addTermTo: (x) => {
                        const [after, before] = x.born.split(':')
                        if (isDateBefore) {
                            return { ...x, born: `${after}:${search}` }
                        } else {
                            return { ...x, born: `${search}:${before}` }
                        }
                    },
                },
            })
        } else if (whichSelected === 'died') {
            setSearchTerms({
                ...searchTerms,
                [`died-${isDateBefore}`]: {
                    displayText: `Died ${isDateBefore ? 'before' : 'after'}:
                ${search}`,
                    addTermTo: (x) => {
                        const [after, before] = x.died.split(':')
                        if (isDateBefore) {
                            return { ...x, died: `${after}:${search}` }
                        } else {
                            return { ...x, died: `${search}:${before}` }
                        }
                    },
                },
            })
        } else {
            setSearchTerms({
                ...searchTerms,
                category: {
                    displayText: `Category: ${search}`,
                    addTermTo: (x) => ({
                        ...x,
                        category: search as IX['category'],
                    }),
                },
            })
        }
    }

    useEffect(() => {
        setX(
            Object.values(searchTerms).reduce(
                (updated, searchTerm) => searchTerm.addTermTo(updated),
                { search: '', born: ':', died: ':', category: '' }
            )
        )
    }, [searchTerms])

    const addSearchTermButton = (
        <button
            type="submit"
            className="btn btn-secondary mx-3"
            onClick={addSearchTerm}>
            add!
        </button>
    )
    const SearchTermsList = (
        <ul className="row mt-3">
            {Object.entries(searchTerms).map(([term, { displayText }]) => {
                const { [term]: removedTerm, ...newSearchTerms } = searchTerms
                return (
                    <SearchTermItem
                        key={displayText}
                        displayText={displayText}
                        remove={() => {
                            setSearchTerms(newSearchTerms)
                        }}
                    />
                )
            })}
        </ul>
    )

    const handleSelection: React.ChangeEventHandler<HTMLSelectElement &
        HTMLInputElement> = (e) => {
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
                <div className="col-12">
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
                    {SearchTermsList}
                </div>
            )
        case 'born':
            return (
                <div className="col-12">
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
                            type="month"
                            value={search}
                            className="form-control mx-3"
                        />
                        {addSearchTermButton}
                    </form>
                    {SearchTermsList}
                </div>
            )
        case 'died':
            return (
                <div className="col-12">
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
                    {SearchTermsList}
                </div>
            )
        case 'category':
            if (!search) setSearch('app')
            return (
                <div className="col-12">
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
                    {SearchTermsList}
                </div>
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

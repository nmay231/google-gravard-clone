import React, { useState, useEffect } from 'react'

import DeadProject from './components/DeadProject'
import Arrow from './components/Arrow'
import SearchTermsContainer from './components/SearchTermsContainer'

const columnHeaders: Array<[string, number]> = [
    ['Name', 2],
    ['Born', 1],
    ['Died', 1],
    ['Description', 7],
    ['Type', 1],
]

export interface IAPIQuery {
    search: string
    born: string // born: 'FROM_DATE:TO_DATE'
    died: string // died: 'FROM_DATE:TO_DATE'
    sortBy: 'born' | 'died' | 'name' | 'category'
    category: Killed['type'] | ''
}

const App = () => {
    const [killed, setKilled] = useState<Killed[]>([])
    const [isUp, setIsUp] = useState(true)
    const [selected, setSelected] = useState(0)
    const [sortBy, setSortBy] = useState<IAPIQuery['sortBy']>('name')
    const [APIQuery, setAPIQuery] = useState<
        Pick<IAPIQuery, 'born' | 'search' | 'died' | 'category'>
    >({
        search: '',
        born: ':',
        died: ':',
        category: '',
    })

    useEffect(() => {
        ;(async () => {
            const querys = Object.entries({ ...APIQuery, sortBy })
                .map((q) => `${q[0]}=${encodeURIComponent(q[1])}`)
                .join('&')
            setKilled(await fetch(`/api?${querys}`).then((r) => r.json()))
        })()
    }, [APIQuery])

    const handleSetSelected = (newSelected: number) => () => {
        if (selected === newSelected) {
            setIsUp(!isUp)
        } else {
            setSelected(newSelected)
            setIsUp(true)
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <SearchTermsContainer
                    query={[
                        APIQuery,
                        (val) => {
                            console.log(val)
                            setAPIQuery(val)
                        },
                    ]}
                />
            </div>
            <div className="row mt-4">
                {columnHeaders.map((name, i) => (
                    <div key={name[0] + i} className={'p-1 col-lg-' + name[1]}>
                        <label
                            htmlFor={'column-' + i}
                            className={
                                'p-2 d-inline-flex btn btn-secondary mr-auto' +
                                (selected === i ? ' active' : '')
                            }>
                            <input
                                type="radio"
                                id={'column-' + i}
                                name="headers"
                                onClick={handleSetSelected(i)}
                            />
                            {name[0]}
                            <Arrow enabled={selected === i} pointUp={isUp} />
                        </label>
                    </div>
                ))}
            </div>
            <ul className="mt-3 pl-0">
                {killed.map((k) => (
                    <DeadProject key={k.slug} killed={k} />
                ))}
            </ul>
        </div>
    )
}
export default App

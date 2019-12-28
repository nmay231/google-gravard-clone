import React, { useState, useEffect } from 'react'

import DeadProject from './components/DeadProject'
import Arrow from './components/Arrow'

const columnHeaders: Array<[string, number]> = [
    ['Name', 2],
    ['Born', 1],
    ['Died', 1],
    ['Description', 7],
    ['Type', 1],
]

const App = () => {
    const [killed, setKilled] = useState<Killed[]>([])
    const [isUp, setIsUp] = useState(true)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        ;(async () => {
            setKilled(await fetch('/api').then((r) => r.json()))
        })()
    }, [])

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

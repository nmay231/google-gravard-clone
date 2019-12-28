import React, { useState, useEffect } from 'react'

interface IArrowProps {
    enabled?: boolean
    pointUp?: boolean
}

const Arrow: React.FC<IArrowProps> = ({ enabled, pointUp }) => {
    const [wasEnabled, setWasEnabled] = useState(false)

    useEffect(() => {
        if (enabled && !pointUp) setWasEnabled(true)
        if (!enabled) setWasEnabled(false)
    }, [enabled, pointUp])

    if (!enabled) {
        return <div className="empty-arrow"></div>
    }

    return (
        <div
            className={
                wasEnabled ? (pointUp ? 'arrow-up' : 'arrow-down') : 'arrow'
            }></div>
    )
}

export default Arrow

import React from 'react'

interface ISearchTermItemProps {
    displayText: string
    remove: () => void
}

const SearchTermItem: React.FC<ISearchTermItemProps> = ({
    displayText,
    remove,
}) => {
    return (
        <div className="d-flex p-2">
            <p>{displayText}</p>
            <div
                className="pl-1"
                onClick={remove}
                style={{ cursor: 'pointer' }}>
                &times;
            </div>
        </div>
    )
}

export default SearchTermItem

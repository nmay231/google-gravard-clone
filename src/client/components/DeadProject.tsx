import React from 'react'

interface IDeadProjectProps {
    killed: Killed
}

const DeadProject: React.FC<IDeadProjectProps> = ({ killed }) => {
    return (
        <div className="row">
            <p className="px-3 py-1 col-lg-2">
                <a href={killed.link} target="_blank" rel="noopener noreffer">
                    {killed.name}
                </a>
            </p>
            <p className="px-3 py-1 col-lg-1">{killed.dateOpen}</p>
            <p className="px-3 py-1 col-lg-1">{killed.dateClose}</p>
            <p className="px-3 py-1 col-lg-7">{killed.description}</p>
            <p className="px-3 py-1 col-lg-1">{killed.type}</p>
        </div>
    )
}

export default DeadProject

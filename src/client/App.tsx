import React, { useState } from 'react'

const App = () => {
    const [killed] = useState([])
    return (
        <ul>
            {killed.map((k) => (
                <li key={k}>k</li>
            ))}
        </ul>
    )
}
export default App

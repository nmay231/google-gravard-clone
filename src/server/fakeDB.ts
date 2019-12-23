import path from 'path'
import fs from 'fs'

const loadJSON = () =>
    JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '../graveyard.json')).toString()
    )

export default loadJSON

import path from 'path'
import fs from 'fs'

interface Killed {
    dateClose: string
    dateOpen: string
    description: string
    link: string
    name: string
    type: 'service' | 'app' | 'hardware'
    slug: string
}

export const loadJSON = () =>
    JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '../graveyard.json')).toString()
    ) as Killed[]

const methods: Record<string, (k1: Killed, k2: Killed) => number> = {
    born: (k1, k2) => k1.dateOpen.localeCompare(k2.dateOpen),
    died: (k1, k2) => k1.dateClose.localeCompare(k2.dateClose),
    name: (k1, k2) => k1.slug.localeCompare(k2.slug),
}

export const sortBy = (array: Killed[], method: string = 'born') =>
    [...array].sort(methods.born).sort(methods[method])

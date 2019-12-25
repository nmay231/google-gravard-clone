import * as knex from 'knex'
import { env } from '../../utils'

export const knextion = knex({
    client: 'sqlite3',
    connection: {
        filename: env.DB_LOCATION,
    },
    useNullAsDefault: true,
})

const methods: Record<string, (k1: Killed, k2: Killed) => number> = {
    born: (k1, k2) => k1.dateOpen.localeCompare(k2.dateOpen),
    died: (k1, k2) => k1.dateClose.localeCompare(k2.dateClose),
    name: (k1, k2) => k1.slug.localeCompare(k2.slug),
}

export const sortBy = (array: Killed[], method: string = 'born') =>
    [...array].sort(methods.born).sort(methods[method])

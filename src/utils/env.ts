import * as dotenv from 'dotenv'
import { resolve } from 'path'

const path = resolve(__dirname, '../config/.env')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path })
}

if (!process.env.LOADED) {
    console.error(
        '\x1b[41m\x1b[33m%s\x1b[0m',
        `Env variables not found at ${path}!`
    )
} else {
    console.log(
        '\x1b[34m%s\x1b[0m',
        'Environment variables loaded successfully.'
    )
}

export const env = {
    DB_LOCATION: resolve(__dirname, '..', process.env.DB_LOCATION as string),
    LOADED: process.env.LOADED === 'true',
}

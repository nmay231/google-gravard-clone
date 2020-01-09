import { knextion } from './db'
import * as fetch from 'isomorphic-fetch'
import { CronJob } from 'cron'

const JSON_URL = 'https://killedbygoogle.com/graveyard.json'

const slowInsertInto = async (into: string, data: Killed[], chunks = 50) => {
    /**
     * Insert data into table 50 rows at a time.
     *
     * I had to do this last time for some reason, but I don't remember exactly why...
     */
    for (let i = 0; i < data.length / chunks; i++) {
        await knextion<Killed>(into).insert(
            data.slice(i * chunks, (i + 1) * chunks)
        )
    }
}

// Update database every Saturday at 1:00 PM
const job = new CronJob('0 13 * * 6', async () => {
    try {
        const json: Killed[] = await fetch(JSON_URL).then((r) => r.json())
        if (!json?.length) {
            throw Error(`No data found in json! File: ${json}`)
        }

        const removed = await knextion<Killed>('Killed').whereNotIn(
            'slug',
            Object.values(json).map((x) => x.slug)
        )
        if (removed.length) {
            console.warn(`Removing (or renaming) some objects: ${removed}`)
        }

        await knextion('Killed').delete()
        await slowInsertInto('Killed', json)

        console.log(
            '\x1b[34m%s\x1b[0m',
            `Updated database on ${Date()}. There are now ${
                json.length
            } entries.`
        )
    } catch (err) {
        console.error('\x1b[41m\x1b[33m%s\x1b[0m', `JSON fetching cron: ${err}`)
    }
})

job.start()

export default job // Just in case I need it

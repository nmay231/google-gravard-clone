import * as express from 'express'

import { knextion } from '../utils/db'

const router = express.Router()

router.use(express.json())

// I am going to setup an api that is both endpoint based and query based

type sortMethodKey = keyof typeof sortMethods
const sortMethods = { born: 'dateOpen', died: 'dateClose', name: 'slug' }

router.get('/', async (req, res) => {
    const contains: string[] = req.query.search?.split(' ')
    const born: number[] = req.query.born?.split(':')
    const died: number[] = req.query.died?.split(':')
    const sortBy: keyof typeof sortMethods = req.query.sortBy
    const category: string = req.query.category

    const query = knextion<Killed>('Killed')

    if (contains) {
        for (let searchTerm of contains) {
            query.where((builder) =>
                builder
                    .where('slug', 'like', `%${searchTerm}%`)
                    .orWhere('description', 'like', `%${searchTerm}%`)
            )
        }
    }

    if (born) {
        if (born[0]) {
            query.where('dateOpen', '>=', born[0])
        }
        if (born[1]) {
            query.where('dateOpen', '<=', born[1])
        }
    }
    if (died) {
        if (died[0]) {
            query.where('dateClose', '>=', died[0])
        }
        if (died[1]) {
            query.where('dateClose', '<=', died[1])
        }
    }

    if (sortBy) {
        query.orderBy(
            sortMethods[sortBy as sortMethodKey] ??
                sortMethods[sortBy.slice(1) as sortMethodKey] ??
                'name',
            sortBy[0] === '-' ? 'desc' : 'asc'
        )
    } else {
        query.orderBy('name', 'asc')
    }

    if (category) query.where({ type: category })

    res.json(await query)
})

router.get('/hello', (req, res, next) => {
    res.json('World')
})

export default router

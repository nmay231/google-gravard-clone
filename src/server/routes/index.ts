import express from 'express'

import { loadJSON, sortBy } from '../utils/fakeDB'

const router = express.Router()

router.use(express.json())

// I am going to setup an api that is both endpoint based and query based

router.get('/', (req, res) => {
    let json = loadJSON()
    const dp = Date.parse

    const contains: string[] = req.query.search?.split(' ')
    let born: number[] = req.query.born?.split(':').map(dp)
    let died: number[] = req.query.died?.split(':').map(dp)
    const sortByMethod: string = req.query.sortBy
    const category: string = req.query.category

    if (born) {
        // filter to only born[0] <= killed.dateOpen <= born[1]
        // Have to deal with stupid NaN though...
        json = json.filter(
            (killed) =>
                !(dp(killed.dateOpen) < born[0]) &&
                !(dp(killed.dateOpen) > born[1])
        )
    }
    if (died) {
        json = json.filter(
            (killed) =>
                !(dp(killed.dateClose) < died[0]) &&
                !(dp(killed.dateClose) > died[1])
        )
    }

    if (category) json = json.filter((killed) => killed.type === category)

    res.json(sortBy(json, sortByMethod))
})

router.get('/hello', (req, res, next) => {
    res.json('World')
})

export default router

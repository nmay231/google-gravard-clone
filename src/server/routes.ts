import express from 'express'

import loadJSON from './fakeDB'

const router = express.Router()

router.use(express.json())

// I am going to setup an api that is both endpoint based and query based

router.get('/', (req, res) => {
    res.json(loadJSON())
})

router.get('/hello', (req, res, next) => {
    res.json('World')
})

export default router

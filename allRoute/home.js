const express = require('express')
const router = express.Router()
const user = require('../model/user')
// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', (req, res) => {
    res.send('Birds home page')
})
// define the about route
router.get('/about', async (req, res) => {
    console.log('dfd');
    const result = await user.find({})
    res.json(result)
})

module.exports = router;
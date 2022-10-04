const express = require('express')
const router = express.Router()
const userSchema = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send('Birds home page')
})
// define the about route
router.get('/about', async (req, res) => {
    console.log('dfd');
    const result = await userSchema.find({})
    res.json(result)
})

module.exports = router;
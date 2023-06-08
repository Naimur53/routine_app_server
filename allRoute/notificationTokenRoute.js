const express = require('express')
const notificationTokenSchema = require('../model/notificationTokenSchema')
const router = express.Router()

router.get('/', async (req, res) => {
    const result = await notificationTokenSchema.find({})
    res.json(result)
})
router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const result = new notificationTokenSchema(data)
        const response = await result.save()

        res.json(response)
    } catch (err) {
        res.status(400).json({ error: 'bad req' })
    }
})
module.exports = router;
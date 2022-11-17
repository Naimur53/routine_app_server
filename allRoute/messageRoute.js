const express = require('express')
const router = express.Router()
const messageSchema = require('../model/messageSchema')
const routineSchema = require('../model/routineSchema')

router.get('/', async (req, res) => {
    try {
        const { routineId } = req.query;
        if (routineId) {
            const response = await messageSchema.find({ routineId }).populate("user")
            console.log('hi')

            res.json(response)
        }
        else {
            const response = await messageSchema.find({})

            res.json(response)
        }
    } catch (err) {
        res.status(400).json({ err: 'bad req' })
    }

})
router.post('/', async (req, res) => {
    const data = req.body
    try {
        const response = new messageSchema(data);
        console.log(response)
        const result = await response.save()
        res.json(result)

    } catch (err) {
        res.status(400).json({ err: "bad req" })
    }


})

module.exports = router;
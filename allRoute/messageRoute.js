const express = require('express')
const router = express.Router()
const messageSchema = require('../model/messageSchema')
const routineSchema = require('../model/routineSchema')

router.get('/', async (req, res) => {
    try {
        const { routineId, skip } = req.query;
        console.log({ routineId, skip });
        if (routineId) {
            let skipMessage = skip ? parseInt(skip) : 0

            const response = await messageSchema.find({ routineId }).sort({ _id: -1 }).populate("user").skip(skipMessage).limit(50)

            const totalMessage = await messageSchema.find({ routineId }).count()

            const data = {
                data: response,
                totalMessage: totalMessage,
                skip: skipMessage,

            }
            // console.log(data);
            // const count=await response.length
            res.json(data)
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
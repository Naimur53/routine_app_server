const express = require('express')
const router = express.Router()
const requestSchema = require('../model/requestSchema')
const userSchema = require('../model/userSchema')
const routineSchema = require('../model/routineSchema')
// overview
router.get('/totalRoutineUsing', async (req, res) => {

    try {
        const response = await routineSchema.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalUserUsing' }
                },

            },
        ])
        const totalRoutine = await routineSchema.count();
        const result = {
            totalRoutineUsing: response[0].total,
            totalRoutine,
        }
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ error: 'bad req' })

    }
})
router.get('/routineStatus', async (req, res) => {
    const { skip, len } = req.query;
    try {
        const response = await routineSchema.find({}).skip(skip).limit(len).select('institute department section shift totalUserUsing')
        res.json(response)
    }
    catch (err) {
        res.status(400).json({ error: 'bad req' })

    }
})
router.get('/requestStatus', async (req, res) => {

    try {
        const pending = await requestSchema.find({ status: 'pending' }).count()
        const approve = await requestSchema.find({ status: 'success' }).count()
        const rejected = await requestSchema.find({ status: 'rejected' }).count()
        res.json({ pending, approve, rejected })
    }
    catch (err) {
        res.status(400).json({ error: 'bad req' })

    }
})
router.get('/userCount', async (req, res) => {

    try {
        const response = await userSchema.find({}).count()
        res.json(response)
    }
    catch (err) {
        res.status(400).json({ error: 'bad req' })

    }
})
module.exports = router;
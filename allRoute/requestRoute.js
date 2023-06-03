const express = require('express')
const router = express.Router()
const requestSchema = require('../model/requestSchema')

router.get('/', async (req, res) => {

    const { id, len, uid, status } = req.query;
    console.log({ id, len, uid, status })
    let result;
    try {
        if (id) {
            const response = await requestSchema.findById(id).populate('creator')
            result = response || {}

        } else if (uid) {
            const response = await requestSchema.find({ creator: uid })
            result = response || {}
        }
        else if (status) {
            const response = await requestSchema.find({ status })
            result = response || {}
        }
        else {
            if (len) {
                result = await requestSchema.find({}).limit(parseInt(len));

            } else {
                result = await requestSchema.find({});

            }
        }
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: 'wrong request' })

    }

})
// define the about route
router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const result = await requestSchema.create(data)
        console.log('dfd', result);
        res.json(result)

    } catch {
        res.status(400).json({ err: 'bad request' })
    }
})
router.put('/', async (req, res) => {

    try {
        const data = req.body;
        const { id } = req.query;
        console.log(data);
        const filter = { _id: id };
        const options = { upsert: true }
        const updateDoc = { $set: data }
        const result = await requestSchema.updateOne(filter, updateDoc, options);
        console.log({ id, ...result })
        // console.log('dfd', result);
        res.json(data)

    } catch {
        res.status(400).json({ err: 'bad request' })
    }
})
router.delete('/', async (req, res) => {
    const { id } = req.query;
    try {

        const result = await requestSchema.findByIdAndDelete(id)
        console.log(result, id);
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ error: 'bad request' })
    }
})

module.exports = router;
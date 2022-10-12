const express = require('express')
const router = express.Router()
const requestSchema = require('../model/requestSchema')

router.get('/', async (req, res) => {

    const { id, len, uid } = req.query;
    console.log({ id, len })
    let result;
    try {
        if (id) {
            const response = await requestSchema.findById(id)
            result = response || {}

        } else if (uid) {
            const response = await requestSchema.findOne({ creator: uid })
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
    const result = await requestSchema.create(data)
    console.log('dfd', result);
    res.json(result)
})

module.exports = router;
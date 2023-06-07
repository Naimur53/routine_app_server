const express = require('express')
const router = express.Router()
const userSchema = require('../model/userSchema')

router.get('/', async (req, res) => {

    const { email, id, len, uid } = req.query;
    console.log({ email, id, len })
    let result;
    try {
        if (email) {
            const response = await userSchema.findOne({ email: email })
            result = response || {}
        } else if (id) {
            const response = await userSchema.findById(id)
            result = response || {}

        } else if (uid) {
            const response = await userSchema.findOne({ uid: uid })
            result = response || {}
        }
        else {
            if (len) {
                result = await userSchema.find({}).limit(parseInt(len));

            } else {
                result = await userSchema.find({});

            }
        }
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: 'wrong request' })

    }

})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await userSchema.create(data)
        res.json(result);
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ error: 'data cant be save', });
    }

})
router.put('/', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const filter = { email: data.email };
        const options = { upsert: true }
        const updateDoc = { $set: data }
        const result = await userSchema.updateOne(filter, updateDoc, options);
        console.log({ result });
        res.json(result);
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ error: 'data cant be save', });
    }

})
router.get('/delete', async (req, res) => {
    try {
        const { email } = req.query;

        const result = await userSchema.deleteOne({ email: email });
        console.log({ result });
        res.json(result);
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ error: 'data cant be save', });
    }

})

module.exports = router;
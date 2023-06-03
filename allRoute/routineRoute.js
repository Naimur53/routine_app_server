const express = require('express')
const routineSchema = require('../model/routineSchema')
const router = express.Router()
const userSchema = require('../model/userSchema');
const mongoose = require('mongoose')

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route 
function isObjectId(text) {
    return mongoose.Types.ObjectId.isValid(text);
}
router.get('/', async (req, res) => {
    let result;
    const { userId, id, len, institute = '', department = '', section = '', semester = '', requestId, skip } = req.query;

    try {
        const mainSkip = skip ? parseInt(skip) : 0;
        const mainLen = len ? parseInt(len) : 8
        console.log({ mainLen, mainSkip });
        if (institute) {
            const isInstituteIsId = isObjectId(institute)
            if (isInstituteIsId) {
                console.log('its a id');
                result = await routineSchema.aggregate([
                    {
                        $match: { _id: mongoose.Types.ObjectId(institute) }
                    }
                ])
                await routineSchema.populate(result, { path: 'creator', })
            } else {
                result = await routineSchema.aggregate([
                    {
                        $search: {
                            index: 'institute',
                            text: {
                                query: institute,
                                path: {
                                    'wildcard': '*'
                                },
                                fuzzy: {
                                    maxEdits: 1,
                                    prefixLength: 0,
                                    maxExpansions: 50,
                                }
                            }
                        }
                    },
                    {
                        $match: {
                            department: { $regex: department, $options: 'i' },
                            section: { $regex: section, $options: 'i' },
                            semester: { $regex: semester, $options: 'i' },
                        }

                    },

                    { $skip: mainSkip },
                    { $limit: mainLen },
                    {
                        $addFields: { maxLen: mainLen, skip: mainSkip, }
                    },
                    {
                        $project: {

                            department: 1,
                            institute: 1,
                            section: 1,
                            semester: 1,
                            shift: 1,
                            creator: 1,
                            date: 1,
                            totalUserUsing: 1,
                            classes: { '$size': '$classes' },
                            score: { $meta: "searchScore" },
                            len: 1,
                            maxLen: 1,
                            skip: 1

                        }
                    },
                    {
                        $sort: { 'score': -1, _id: -1, }
                    },

                ])
                await routineSchema.populate(result, { path: 'creator', })
            }



        }
        else if (userId && id) {
            result = await routineSchema.findOne({ _id: mongoose.Types.ObjectId(id), creator: userId }).populate('creator')
            console.log(userId, id);

        }
        else if (requestId) {
            result = await routineSchema.findOne({ requestId }).populate('creator')
        }
        else if (userId) {
            result = await routineSchema.find({ creator: userId }).populate('creator')
        } else if (id) {
            const response = await routineSchema.findById(id).populate('creator')
            result = response || {}
        }
        else {
            console.log('normal')
            result = await routineSchema.find({

                department: { $regex: department, $options: 'i' },
                section: { $regex: section, $options: 'i' },
                semester: { $regex: semester, $options: 'i' },


            },
            ).sort({ '_id': -1 }).skip(skip).limit(len).populate('creator');
        }
        console.log(req.query)
        res.json(result || {})
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: 'wrong response' })
    }

})
router.get('/findById', async (req, res) => {
    try {
        const result = await routineSchema.findById(req.query.id).populate('creator')
        if (result) {

            res.json(result)
        } else {
            res.status(400).json({ err: 'data not found' })
        }


    }
    catch (err) {
        res.status(400).json({ err: 'Id not valid' })
    }
})
// define the about route
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = new routineSchema(data)
        console.log(result);
        const response = await result.save()
        const output = await result.populate('creator')
        res.json(output)
    } catch (e) {
        console.log('error', e)
        res.status(400).json({ error: 'Wrong data type' })

    }
})
router.put('/', async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.query
        const result = await routineSchema.findOneAndUpdate({ _id: id }, data.mainData)
        console.log(result, "update");
        res.json(result)
    } catch (e) {
        console.log('error', e)
        res.status(400).json({ error: 'Wrong data type' })

    }
})
router.put('/increaseUsingValue', async (req, res) => {
    try {
        const { id } = req.query
        console.log({ id })
        const result = await routineSchema.findOneAndUpdate({ _id: id }, { '$inc': { 'totalUserUsing': 1 } })
        console.log(result)
        res.json(result)
    } catch (e) {
        console.log('error', e)
        res.status(400).json({ error: 'Wrong data type', err: e })

    }
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        // const { id } = req.query
        console.log({ id })
        const result = await routineSchema.deleteOne({ _id: id })
        res.json(result)
    } catch (e) {
        console.log('error', e)
        res.status(400).json({ error: 'Wrong data type', err: e })
    }
})

module.exports = router;


const express = require('express')
const routineSchema = require('../model/routineSchema')
const router = express.Router()
const userSchema = require('../model/userSchema')
// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route

const demoData = {
    institute: "Brahmanbaria Polytechnic Institute , Brahmanbaria",
    department: "Cmt",
    semester: "1st",
    shift: "1st",
    section: "A",
    creator: '6338514f039cccee3546ae8f',
    classes: [
        {
            day: "Sunday",
            endTime: "Sat Sep 17 2022 03:30:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 02:00:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "Fundamental",
            teacherName: "Naimur Rahman",
            roomNumber: '3233',
        },
        {
            day: "Monday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            subjectName: "Chemistry",
            subjectCode: "6645dfd4",
            teacherName: "Ovi Sheikh",
            day: "Monday",
            startTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            "subjectName": "Biology",
            "subjectCode": "6645dfd4",
            "teacherName": "Akash Hossain",
            "day": "Tuesday",
            "startTime": "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            "endTime": "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            day: "Sunday",
            endTime: "Sat Sep 17 2022 03:30:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 02:00:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "Fundamental tor main khai mehedi df ddf dfdf d",
            teacherName: "Naimur Rahman",
            roomNumber: '3233',
        },
        {
            day: "Monday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            subjectName: "Chemistry",
            subjectCode: "6645dfd4",
            teacherName: "Ovi Sheikh",
            day: "Monday",
            startTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Tuesday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Tuesday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Tuesday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Tuesday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            day: "Sunday",
            endTime: "Sat Sep 17 2022 03:30:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 02:00:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "Fundamental",
            teacherName: "Naimur Rahman",
            roomNumber: '3233',
        },
        {
            day: "Monday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            subjectName: "Chemistry",
            subjectCode: "6645dfd4",
            teacherName: "Ovi Sheikh",
            day: "Monday",
            startTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Tuesday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            day: "Sunday",
            endTime: "Sat Sep 17 2022 03:30:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 02:00:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "Fundamental",
            teacherName: "Naimur Rahman",
            roomNumber: '3233',
        },
        {
            day: "Monday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            subjectName: "Chemistry",
            subjectCode: "6645dfd4",
            teacherName: "Ovi Sheikh",
            day: "Saturday",
            startTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 02:30:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology tor mai dfd dfd dfd dfdfd dfd ",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Tuesday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            subjectName: "Biology tor mai dfd dfd dfd dfdfd dfd ",
            subjectCode: "6645dfd4",
            teacherName: "Akash Hossain",
            day: "Friday",
            startTime: "Sat Sep 17 2022 03:00:00 GMT+0600 (Bangladesh Standard Time)",
            endTime: "Sat Sep 17 2022 03:45:00 GMT+0600 (Bangladesh Standard Time)",
            roomNumber: '3233',
        },
        {
            day: "Friday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            day: "Wednesday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            day: "Wednesday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },
        {
            day: "Thursday",
            endTime: "Sat Sep 17 2022 02:15:00 GMT+0600 (Bangladesh Standard Time)",
            startTime: "Sat Sep 17 2022 01:30:00 GMT+0600 (Bangladesh Standard Time)",
            subjectCode: "6645dfd4",
            subjectName: "physics",
            teacherName: "Sheikh Sadi",
            roomNumber: '3233',
        },


    ]
}
router.get('/', async (req, res) => {
    let result;
    const { userId, id, len, institute, department, section, semester } = req.query;
    console.log({ userId, id, len, institute, department, section, semester })
    try {
        if (institute) {
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

                { $limit: 50 },
                {
                    $project: {
                        department: 1,
                        institute: 1,
                        section: 1,
                        semester: 1,
                        shift: 1,
                        creator: 1,
                        date: 1,
                        classes: { '$size': '$classes' },
                        score: { $meta: "searchScore" }
                    }
                },
            ])
            await routineSchema.populate(result, { path: 'creator', })
        }
        else if (userId && id) {
            result = await routineSchema.findOne({ _id: id, creator: userId }).populate('creator')

        }
        else if (userId) {
            result = await routineSchema.find({ creator: userId }).populate('creator')
        } else if (id) {
            const response = await routineSchema.findById(id).populate('creator')
            result = response || {}
        } else if (len) {
            result = await routineSchema.find({}).limit(parseInt(len)).populate('creator')
        }
        else {
            result = await routineSchema.find({}).populate('creator');
        }
        console.log(req.query)
        res.json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: 'wrong response' })
    }

})
// define the about route
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = new routineSchema(data)
        const response = await result.save()
        res.json(result)
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

        res.json(result)
    } catch (e) {
        console.log('error', e)
        res.status(400).json({ error: 'Wrong data type' })

    }
})

module.exports = router;


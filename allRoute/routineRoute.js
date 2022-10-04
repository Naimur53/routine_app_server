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
    //method for creating
    // const result = await routineSchema(demoData).populate('creator')
    // const re = await result.save()
    const result = await routineSchema.find({}).populate('creator')
    res.json(result)
})
// define the about route
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = new routineSchema(data)
        const response = await result.save()
        res.json(response)
    } catch (e) {
        console.log('error', e)
        res.status(400).json({ error: 'Wrong data type' })

    }
})

module.exports = router;


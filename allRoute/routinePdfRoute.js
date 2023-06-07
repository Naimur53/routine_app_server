const express = require('express')
const router = express.Router()
const routineSchema = require('../model/routineSchema')
const PDFDocument = require('pdfkit');
const { getMinClassLength, textConversion, formatAMPM, getUniqueExitDays } = require('../util/createPdfMethod')
const fs = require('fs');
// Class routine data 

const classRoutines = [

    // {
    //     "day": "Sunday",
    //     "roomNumber": "EMT SHOP",
    //     "subjectName": "Digital Electronics",
    //     "subjectCode": "66834",
    //     "teacherName": "Md.Tofazzol Hoque ",
    //     "startTime": "2022-11-19T02:00:00.000Z",
    //     "endTime": "2022-11-19T04:15:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e73"
    // },
    // {
    //     "day": "Monday",
    //     "roomNumber": "212",
    //     "subjectName": "Digital Electronics",
    //     "subjectCode": "66834",
    //     "teacherName": "Md.Tofazzol Hoque ",
    //     "startTime": "2022-11-19T05:00:00.000Z",
    //     "endTime": "2022-11-19T05:45:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e74"
    // },
    // {
    //     "day": "Tuesday",
    //     "roomNumber": "212",
    //     "subjectName": "Digital Electronics",
    //     "subjectCode": "66834",
    //     "teacherName": "Md.Tofazzol Hoque ",
    //     "startTime": "2022-11-19T05:00:00.000Z",
    //     "endTime": "2022-11-19T05:45:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e75"
    // },
    // {
    //     "day": "Thursday",
    //     "roomNumber": "212",
    //     "subjectName": "Digital Electronics",
    //     "subjectCode": "66834",
    //     "teacherName": "Md.Tofazzol Hoque ",
    //     "startTime": "2022-11-19T05:00:00.000Z",
    //     "endTime": "2022-11-19T05:45:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e76"
    // },
    // {
    //     "day": "Sunday",
    //     "roomNumber": "212",
    //     "subjectName": "Pperating Room Equipment & Safety",
    //     "subjectCode": "68642",
    //     "teacherName": "md.Abul Kashem",
    //     "startTime": "2022-11-19T04:15:00.000Z",
    //     "endTime": "2022-11-19T05:00:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e77"
    // },
    // {
    //     "day": "Tuesday",
    //     "roomNumber": "EMT LAB ",
    //     "subjectName": "Pperating Room Equipment & Safety",
    //     "subjectCode": "68642",
    //     "teacherName": "md.Abul Kashem",
    //     "startTime": "2022-11-19T02:00:00.000Z",
    //     "endTime": "2022-11-19T04:15:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e78"
    // },
    // {
    //     "day": "Wednesday",
    //     "roomNumber": "212 ",
    //     "subjectName": "Pperating Room Equipment & Safety",
    //     "subjectCode": "68642",
    //     "teacherName": "md.Abul Kashem",
    //     "startTime": "2022-11-19T05:00:00.000Z",
    //     "endTime": "2022-11-19T05:15:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e79"
    // },
    // {
    //     "day": "Sunday",
    //     "roomNumber": "212 ",
    //     "subjectName": "Business Organization & Communication",
    //     "subjectCode": "65841",
    //     "teacherName": "Md.Asif Mostafa",
    //     "startTime": "2022-11-19T05:00:00.000Z",
    //     "endTime": "2022-11-19T05:45:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e7a"
    // },
    // {
    //     "day": "Thursday",
    //     "roomNumber": "212 ",
    //     "subjectName": "Business Organization & Communication",
    //     "subjectCode": "65841",
    //     "teacherName": "Md.Asif Mostafa",
    //     "startTime": "2022-11-19T05:45:00.000Z",
    //     "endTime": "2022-11-18T18:30:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e7b"
    // },
    // {
    //     "day": "Sunday",
    //     "roomNumber": "212 ",
    //     "subjectName": "Environmental Studies ",
    //     "subjectCode": "69054",
    //     "teacherName": "Md.Manirul Hoque ",
    //     "startTime": "2022-11-19T05:45:00.000Z",
    //     "endTime": "2022-11-18T18:30:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e7c"
    // },
    // {
    //     "day": "Monday",
    //     "roomNumber": "212 ",
    //     "subjectName": "Environmental Studies ",
    //     "subjectCode": "69054",
    //     "teacherName": "Md.Manirul Hoque ",
    //     "startTime": "2022-11-19T05:45:00.000Z",
    //     "endTime": "2022-11-18T18:30:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e7d"
    // },
    // {
    //     "day": "Monday",
    //     "roomNumber": " BASIC LAB",
    //     "subjectName": "Electrical Machine ",
    //     "subjectCode": "66744",
    //     "teacherName": "Pujan Chandara Paul ",
    //     "startTime": "2022-11-19T02:00:00.000Z",
    //     "endTime": "2022-11-19T04:15:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e7e"
    // },
    // {
    //     "day": "Tuesday",
    //     "roomNumber": "212",
    //     "subjectName": "Biomedicl Signal Processing ",
    //     "subjectCode": "68643",
    //     "teacherName": "Mst.Khadiza khatum",
    //     "startTime": "2022-11-19T04:15:00.000Z",
    //     "endTime": "2022-11-19T05:00:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e7f"
    // },
    // {
    //     "day": "Wednesday",
    //     "roomNumber": "212",
    //     "subjectName": "Biomedicl Signal Processing ",
    //     "subjectCode": "68643",
    //     "teacherName": "Mst.Khadiza khatum",
    //     "startTime": "2022-11-19T04:15:00.000Z",
    //     "endTime": "2022-11-19T05:00:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e80"
    // },
    // {
    //     "day": "Thursday",
    //     "roomNumber": "EMT LAB ",
    //     "subjectName": "Biomedicl Signal Processing ",
    //     "subjectCode": "68643",
    //     "teacherName": "Mst.Khadiza khatum",
    //     "startTime": "2022-11-19T02:00:00.000Z",
    //     "endTime": "2022-11-19T04:15:00.000Z",
    //     "_id": "6377e8a024d536ed17b17e81"
    // },
    // {
    //     "day": "Monday",
    //     "roomNumber": "212",
    //     "subjectName": "Medical Transducer & Sensors",
    //     "subjectCode": "68641",
    //     "teacherName": "Mst.khadiza Khataun",
    //     "startTime": "2022-11-19T04:15:00.000Z",
    //     "endTime": "2022-11-19T05:00:00.000Z",
    //     "_id": "6377f31f24d536ed17b189e6"
    // },
    // {
    //     "day": "Tuesday",
    //     "roomNumber": "EMT LAB ",
    //     "subjectName": "Operating Room Equipment &Safety ",
    //     "subjectCode": "68642",
    //     "teacherName": "Mst.khadiza Khataun",
    //     "startTime": "2022-11-19T02:00:00.000Z",
    //     "endTime": "2022-11-19T04:15:00.000Z",
    //     "_id": "6377f31f24d536ed17b189e7"
    // },
    // {
    //     "day": "Wednesday",
    //     "roomNumber": "EMT LAB ",
    //     "subjectName": "Medical Transducer & Sensors",
    //     "subjectCode": "68641",
    //     "teacherName": "Mst.khadiza Khatun",
    //     "startTime": "2022-11-19T02:00:00.000Z",
    //     "endTime": "2022-11-19T04:15:00.000Z",
    //     "_id": "6377f31f24d536ed17b189e8"
    // },
    // {
    //     "day": "Wednesday",
    //     "roomNumber": "212",
    //     "subjectName": "Eiectrical Machine",
    //     "subjectCode": "68644",
    //     "teacherName": "Pujan chandra Paul",
    //     "startTime": "2022-11-19T05:45:00.000Z",
    //     "endTime": "2022-11-18T18:30:00.000Z",
    //     "_id": "6377f31f24d536ed17b189e9"
    // },
    // {
    //     "day": "Thursday",
    //     "roomNumber": "212",
    //     "subjectName": "Eiectrical Macjine",
    //     "subjectCode": "66744",
    //     "teacherName": "Pujan chandra Paul",
    //     "startTime": "2022-11-19T04:15:00.000Z",
    //     "endTime": "2022-11-19T05:00:00.000Z",
    //     "_id": "6377f31f24d536ed17b189ea"
    // }
];

router.get('/', async (req, res) => {
    // Class routine data
    const { routineId } = req.query

    if (routineId) {
        try {
            const routine = await routineSchema.findById(routineId)
            console.log(routine)
            // Set font size and line height for the document
            if (routine?._id) {
                const doc = new PDFDocument()
                doc.page.margins = {
                    top: 20,
                    left: 00,
                    right: 10,

                }
                doc.fontSize(9);
                doc.lineGap(10);



                // // Iterate over each day of the week and add a box with the day's name
                // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                /// Set initial x and y coordinates for the boxes
                let x = 10;
                let y = 100;

                let boxWidth = 85;
                let boxHeight = 30;

                let maxTextLength = 10;

                const dayOfWeek = getUniqueExitDays(routine.classes)
                // change size
                if (dayOfWeek.length === 1) {
                    boxWidth = 595
                    maxTextLength = 152
                }
                else if (dayOfWeek.length === 2) {
                    boxWidth = 298
                    maxTextLength = 77
                }
                else if (dayOfWeek.length === 3) {
                    boxWidth = 198
                    maxTextLength = 50
                }
                else if (dayOfWeek.length === 4) {
                    boxWidth = 148
                    maxTextLength = 37
                }
                else if (dayOfWeek.length === 5) {
                    boxWidth = 118
                    maxTextLength = 25
                }
                else if (dayOfWeek.length === 6) {
                    boxWidth = 98
                    maxTextLength = 18
                }
                doc.fontSize(16);
                doc.text(routine.institute, 0, 10, { align: "center" });
                doc.fontSize(14);
                doc.text(routine.department, { align: "center" });
                doc.fontSize(12);
                doc.text(`Shift ${routine['shift']}`, -140, 65, { align: "center" });
                doc.text(`Semester ${routine['semester']}`, 0, 65, { align: "center" });
                doc.text(`section ${routine['section']}`, 160, 65, { align: "center" });

                dayOfWeek.forEach((day, index) => {
                    doc.fontSize(9);

                    // Draw a box with the day's name
                    doc.rect(x, y, boxWidth, boxHeight).stroke();
                    doc.text(day, x + 10, y + 10);

                    let classBoxHeight = boxHeight + 80

                    let classX = x;
                    let classY = classBoxHeight + 20

                    routine.classes.filter(single => single.day === day).forEach((info, index2) => {
                        doc.fontSize(9);
                        // Draw a box with the day's name
                        doc.rect(classX, classY, boxWidth, classBoxHeight).stroke();
                        doc.text(info.subjectCode, classX + 10, classY + 10, {});
                        doc.text(textConversion(info.subjectName, maxTextLength), classX + 10, classY + 25,);

                        doc.text(textConversion(info.teacherName, maxTextLength), classX + 10, classY + 40,);

                        doc.text("RN-" + textConversion(info.roomNumber, maxTextLength - 4), classX + 10, classY + 55,);

                        let startTime = `${formatAMPM(new Date(info.startTime))} `

                        let endTime = `${formatAMPM(new Date(info.endTime))} `
                        if (dayOfWeek.length === 7) {

                            doc.fontSize(7);
                        }
                        doc.text(`${startTime}-${endTime}`, classX + 10, classY + 70,);


                        classY += classBoxHeight;

                        // Update the x coordinate for the next box
                    });

                    x += boxWidth;
                    // Update the x coordinate for the next box
                });

                // Move to the next line after drawing the boxes
                doc.moveDown(2);




                // Set the response headers to display the PDF in the browser
                // for show
                // res.setHeader('Content-Type', 'application/pdf');
                // res.setHeader('Content-Disposition', 'inline; filename=class_routine.pdf');

                // for download
                res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
                res.setHeader('Content-Type', 'application/pdf');
                doc.pipe(res);
                doc.end();
            } else {
                res.status(400).json({ err: 'bad req' })

            }


        } catch (err) {
            res.status(400).json({ err: 'bad req' })


        }


    } else {
        res.status(400).json({ err: 'bad req' })
    }



    // Create a new PDF document

})

module.exports = router;
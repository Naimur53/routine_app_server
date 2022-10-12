const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2;

const uuid = function () {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};


// cloudinary config 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

router.post('/', async (req, res) => {
    const file = req.files?.file;
    console.log(file.name)
    try {
        if (file?.name) {

            await cloudinary.uploader.upload(file.tempFilePath,
                {
                    resource_type: "image", public_id: "myfolder/images/" + file?.name?.split('.')[0] + uuid(),
                },
                function (error, result) {
                    if (error) {
                        console.log('dfdfd', error)


                    }
                    if (result) {
                        console.log({ result, error })
                        const url = result.url
                        res.json({ url })

                    }
                });
        }


    }
    catch (e) {
        console.log(e)
        res.status(400).json({ url: undefined })
    }
})

module.exports = router;
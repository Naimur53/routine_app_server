const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const uuid = function () {
  return Date.now() + "_" + Math.random().toString(36).substr(2, 9);
};

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// router.post("/", async (req, res) => {
//   const file = req.files?.file;
//   console.log(file.name);
//   try {
//     if (file?.name) {
//       await cloudinary.uploader.upload(
//         file.tempFilePath,
//         {
//           resource_type: "image",
//           public_id: "myfolder/images/" + file?.name?.split(".")[0] + uuid(),
//         },
//         function (error, result) {
//           if (error) {
//             console.log("dfdfd", error);
//           }
//           if (result) {
//             console.log({ result, error });
//             const url = result.url;
//             res.json({ url });
//           }
//         }
//       );
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(400).json({ url: undefined });
//   }
// });

router.post("/", async (req, res) => {
  const file = req.files?.file;
  console.log(file.name);
  try {
    if (file?.name) {
      // Read the image file
      const image = sharp(file.tempFilePath);
      console.log(file.data.size);

      // Compress the image
      const compressedImageBuffer = await image
        .jpeg({ quality: 50 })
        .toBuffer();

      // Upload the compressed image buffer to Cloudinary
      const result = await cloudinary.uploader.upload(
        "data:image/jpeg;base64," + compressedImageBuffer.toString("base64"), // Convert the buffer to base64 string
        {
          resource_type: "image",
          public_id: "myfolder/images/" + file?.name?.split(".")[0] + uuid(),
        }
      );

      const url = result.url;
      console.log(url);
      res.json({ url });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ url: undefined });
  }
});

module.exports = router;

const express = require('express')
const app = express();
const port = process.env.PORT || 5001;
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const router = express.Router()
// routing pages
const homeRoute = require('./allRoute/homeRoute')
const userRoute = require('./allRoute/userRoute')
const routineRoute = require('./allRoute/routineRoute')
const uploadImageRoute = require('./allRoute/uploadImageRoute')
const requestRoute = require('./allRoute/requestRoute')
const adminRoute = require('./allRoute/adminRoute')

//middle
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// mongodb 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mernapp.ipnfb2l.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, () => {
    console.log('connect', uri)
}, e => console.log(e))

// handle JWT
async function verifyToken(req, res, next) {
    if (req.headers.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1];
        try {
            const decodedUser = await admin.auth().verifyIdToken(idToken)

            console.log(decodedUser.email, 'hears');
            req.decodedUserEmail = decodedUser.email
        }
        catch (e) {
            console.log('dfdkfdf', e);

        }
    }
    next();
}
// https://routine-app-server-main.onrender.com/routine
// main program
async function run() {
    try {
        app.use('/user', userRoute)
        app.use('/routine', routineRoute)
        app.use('/uploadImage', uploadImageRoute)
        app.use('/requestRoutine', requestRoute)
        app.use('/admin', adminRoute)
    }
    catch (e) {
        console.log("main", e.message)
    }
}


run().catch(console.dir);
// default 
app.get('/', async (req, res) => {
    res.send('test server is  running   ');
})
app.listen(port, () => {
    console.log('server is running at port', port);
})










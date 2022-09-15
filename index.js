const express = require('express')
const app = express();
const port = process.env.PORT || 5001;
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const router = express.Router()
// routing pages
const home = require('./allRoute/home')

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


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icikx.mongodb.net/routine?retryWrites=true&w=majority`;

mongoose.connect(uri, () => {
    console.log('connect', uri)
}, e => console.log(e))


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
async function run() {
    try {
        app.use('/home', home)


    }
    catch (e) {

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










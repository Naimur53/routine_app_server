const express = require('express')
const app = express();
const port = process.env.PORT || 5001;
const http = require('http');
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
const messageRoute = require('./allRoute/messageRoute')
const notificationTokenRoute = require('./allRoute/notificationTokenRoute')
const routinePdfRoute = require('./allRoute/routinePdfRoute')
const tesseract = require("node-tesseract-ocr")

// socket 
const { Server } = require('socket.io');
const server = http.createServer(app);

//io server
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
//socket io connection
io.on('connection', (socket) => {
    console.log(socket.id, 'new');
    socket.on('join', id => {
        console.log('Joining ', id);
        socket.join(id);

    });
    socket.on('leave', id => {
        console.log('leave', id);
        socket.leave(id);
    });
    socket.on('message', msg => {
        console.log(msg.message, msg.routineId)
        socket.to(msg.routineId).emit('receive_message', msg);
        // socket.broadcast.emit('message', msg)
    });
    socket.on('checkActive', id => {
        socket.to(id).emit('isActive', id);
    })
    socket.on('activeUser', user => {
        socket.broadcast.emit('receive_activeUser', user)
    })
    // socket.on('say to someone', (id, msg) => {
    //     socket.to(id).emit('my message', msg);
    //     console.log('person', id, msg);
    // });
    // socket.on('join_chat', data => {
    //     socket.join(data);
    //     console.log('join', data);
    // })
    socket.on('disconnect', () => {
        console.log('user disconnect', socket.id);
    })

})

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
        app.use('/message', messageRoute)
        app.use('/notificationToken', notificationTokenRoute)
        app.use('/makePdf', routinePdfRoute)

        // app.get("/test", async (req, res) => {
        //     const config = {
        //         lang: "eng",
        //         oem: 1,
        //         psm: 3,
        //     }

        //     const img = "https://tesseract.projectnaptha.com/img/eng_bw.png"

        //     tesseract.recognize(img, config)
        //         .then((text) => {
        //             console.log("Result:", text)
        //         })
        //         .catch((error) => {
        //             console.log(error.message)
        //         })
        //     res.json({ a: 'hmm' })
        // })
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
server.listen(port, () => {
    console.log('server is running at port', port);
})










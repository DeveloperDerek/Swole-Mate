const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); 
const socket = require('socket.io');
require('dotenv').config(); // stores environmental variables (.env), place .env at root of server folder
const connectDB = require("./configs/database"); //import database
connectDB(); //activate database

const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());

app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //activate cors to allow crossing of browsers and server

app.use(cookieParser()); // activate cookies reading

app.use("/api/user", require("./routes/user.route"));
app.use("/api/friend/", require("./routes/friend.route"));
app.use("/api/message/", require("./routes/message.route"));
app.use("/api/mailchimp/", require("./routes/newsletter.route"));

const server = app.listen((port), () =>
    console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);

const io = socket(server, {
    cors: {
        origin: "*",
        methods: [
        'GET',
        'POST',
        'HEAD',
        'OPTIONS',
        'PUT'
        ]
    }
});

const Message = require("./models/message.model");
const User = require("./models/user.model");

io.on("connection", (socket) => {

    socket.on("get-msgs", async (data) => {
        // set up global variable to save logged in user's id
        socket.user_id = data.from;
        const msgs = await Message.find({
            $or:[ 
                { to: data.to, from: data.from}, 
                { to: data.from ,from: data.to} 
            ] 
        }).populate('from').exec();
        io.emit("send dm", msgs)
    })

    socket.on("new msg", async (data) => {
        await Message.create(data)
        const msgs = await Message.find({
            $or:[ 
                { to: data.to, from: data.from}, 
                { to: data.from ,from: data.to} 
            ] }).populate('from').exec();
        io.emit("send dm", msgs)
    });

    socket.on("disconnect", () => {
        User.findByIdAndUpdate(socket.user_id, {status: false})
        .catch((err) => res.json(err));
    });
});
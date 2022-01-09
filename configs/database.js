const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
        //1 - Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
    }
}

module.exports = connectDB
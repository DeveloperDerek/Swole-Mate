const Mongoose = require("mongoose");

const friendSchema = new Mongoose.Schema(
    {
        requester: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
        recipient: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
            type: Number,
            enums: [
                0, // Add Friend
                1, // Requested
                2, // Pending
                3 // Friends
            ]
        }
    }, { timestamps: true }
)

const Friend = Mongoose.model("Friend", friendSchema);

module.exports = Friend;
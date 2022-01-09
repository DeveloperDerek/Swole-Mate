const User = require("../models/user.model");
const Friend = require("../models/friend.model");
const mongoose = require("mongoose");

module.exports = {
    async requestFriend (req, res) {
        const docA = await Friend.findOneAndUpdate(
            { requester: req.user._id, recipient: req.body.id },
            { $set: { status: 1 }},
            { upsert: true, new: true }
        )
        const docB = await Friend.findOneAndUpdate(
            { recipient: req.user._id, requester: req.body.id },
            { $set: { status: 2 }},
            { upsert: true, new: true }
        )
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $addToSet: { friends: docA._id }}
        )
        await User.findOneAndUpdate(
            { _id: req.body.id },
            { $addToSet: { friends: docB._id }}
        )
        return res.json({ msg: "friend requested"})
    },
    async acceptRequest (req, res) {
        try{
            await Friend.findOneAndUpdate(
                { requester: req.user._id, recipient: req.body.id },
                { $set: { status: 3 }}
            )
            await Friend.findOneAndUpdate(
                { recipient: req.user._id, requester: req.body.id },
                { $set: { status: 3 }}
            )
            return res.json({ msg: "accepted request"})
        } catch (err) {
            console.log(err)
        }
    },
    async rejectRequest (req, res) {
        const docA = await Friend.findOneAndRemove(
            { requester: req.user._id, recipient: req.body.id }
        )
        const docB = await Friend.findOneAndRemove(
            { recipient: req.user._id, requester: req.body.id }
        )
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { friends : docA._id }}
        )
        await User.findOneAndUpdate(
            { _id: req.body.id },
            { $pull: { friends : docB._id }}
        )
        return res.json({ msg: "removed request"})
    },
    async getNonFriends(req, res) {
        try {
            const friends = await User.aggregate([
                { "$lookup": {
                    "from": Friend.collection.name,
                    "let": { "friends": "$friends" },
                    "pipeline": [
                        { "$match": {
                            "recipient": mongoose.Types.ObjectId(req.user._id),
                            "$expr": { "$in": [ "$_id", "$$friends" ] }
                        }},
                        { "$project": { "status": 1 } }
                    ],
                    "as": "friends"
                }},
                { "$addFields": {
                    "friendsStatus": {
                        "$ifNull": [ { "$min": "$friends.status" }, 0 ]
                    }
                }}
            ])
            return res.json(friends.filter(f => f.friendsStatus == 0))
        } catch (err) {
            console.log(err)
        }
    },
    async getFriends (req, res) {
        try {
            const friends = await User.aggregate([
                { "$lookup": {
                    "from": Friend.collection.name,
                    "let": { "friends": "$friends" },
                    "pipeline": [
                        { "$match": {
                            "recipient": mongoose.Types.ObjectId(req.user._id),
                            "$expr": { "$in": [ "$_id", "$$friends" ] }
                        }},
                        { "$project": { "status": 1 } }
                    ],
                    "as": "friends"
                }},
                { "$addFields": {
                    "friendsStatus": {
                        "$ifNull": [ { "$min": "$friends.status" }, 0 ]
                    }
                }}
            ])
            return res.json(friends.filter(f => f.friendsStatus == 3))
        } catch (err) {
            console.log(err)
        }
    },
    async getRequests (req, res) {
        try {
            const friends = await User.aggregate([
                { "$lookup": {
                    "from": Friend.collection.name,
                    "let": { "friends": "$friends" },
                    "pipeline": [
                        { "$match": {
                            "recipient": mongoose.Types.ObjectId(req.user._id),
                            "$expr": { "$in": [ "$_id", "$$friends" ] }
                        }},
                        { "$project": { "status": 1 } }
                    ],
                    "as": "friends"
                }},
                { "$addFields": {
                    "friendsStatus": {
                        "$ifNull": [ { "$min": "$friends.status" }, 0 ]
                    }
                }}
            ])
            return res.json(friends.filter(f => f.friendsStatus == 1))
        } catch (err) {
            console.log(err)
        }
    }
}
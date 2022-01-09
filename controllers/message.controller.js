const Message = require("../models/message.model");

module.exports = {
    getMessages(req, res) {
        Message.find()
            .then((msg) => res.json(msg))
            .catch((err) => res.json(err))
    },
    createMessage(req, res) {
        Message.create(req.body)
            .then((msg) => res.json(msg))
            .catch((err) => res.json(err))
    },
    async getDirectMessages(req, res) {
        const msgs = await Message.find({
            $or:[ 
                { to: req.user._id, from: req.params.id}, 
                { to: req.params.id ,from: req.user._id} 
            ] }).populate('from').populate('to').exec(); //grabs the user info
        return res.json(msgs);
    }
}
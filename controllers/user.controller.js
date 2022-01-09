const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require('moment');
const upload = require("../configs/imageUpload");
const singleUpload = upload.single("image");

module.exports = {
    register(req, res) {
        User.create(req.body)
            .then((user) => {
                // create token for authorization
                const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET)
                // set cookie to let client remember you
                res.cookie(
                    "usertoken", /* name */
                    token, /* value */
                    { httpOnly: true } /* options */
                    //additional flag included in a Set-Cookie HTTP response header. Using it when generating a cookie helps mitigate the risk of client side script accessing the protected cookie. Can't be accessed by javascript
                )
                .json(user._id)
            })
            .catch((err) => res.status(400).json(err))
    },
    // GETALL: Find all users
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.json(err));
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.id})
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err))
    },
    update(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findByIdAndUpdate(decodedJWT.payload._id, req.body)
            .then((updatedUser) => res.json(updatedUser))
            .catch((err) => res.status(400).json(err))
    },
    login(req, res) {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered" })
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                res.status(400).json({ msg: "invalid email" });
                } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((passwordIsValid) => {
                        if (passwordIsValid) {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                            res.cookie(
                                "usertoken", //name of cookie
                                token, //data of cookie
                                { httpOnly: true }
                            )
                            .json({ id: user._id })
                        } else {
                            res.status(400).json({ msg: "invalid password" });
                        }
                    })
                    .catch((err) =>
                        res.status(400).json({ msg: "invalid login attempt" })
                    );
                }
            })
            .catch((err) => res.json(err));
    },
    logout(req, res) {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoken cookie cleared" })
    },
    setStatus(req, res) {
        User.findByIdAndUpdate(req.user._id, {status: true})
            .catch((err) => res.json(err));
    },
    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload._id)
            .then((usr) => res.json(usr))
            .catch((err) => res.json(err));
    },
    async addPic(req, res) {
        await singleUpload(req, res, function (err) {
            if (err) {
                return res.json(false);
            }
            User.findByIdAndUpdate(
                {_id : req.user._id},
                {$addToSet : {pictures : req.file.location}},
                { new: true }
            )
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(400).json({ success: false, error: err }));
        });
    },
    deletePic(req, res) {
        User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull : { pictures: req.body.url }},
            { new: true }
        )
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
    },
    async swoleSearch(req, res) {
        let user = await User.findById(req.user._id);
        const min = moment().subtract(user.settings.min, "years").format("YYYY-MM-DD");
        const max = moment().subtract(user.settings.max, "years").format("YYYY-MM-DD");
        if(user.settings.gender == "") {
            // no gender in search
            await User.find({
                $and: [
                    {birthday: {$gte:max, $lt:min}}
                ]
            })
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err))
        } else {
            // if gender included in search
            await User.find({
                $and: [
                    {gender: user.settings.gender},
                    {birthday: {$gte:max, $lt:min}}
                ]
            })
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err));
        }
    }
}

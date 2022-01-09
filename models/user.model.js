const Mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const moment = require("moment");

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            validate: {
                validator: val => val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        firstName: {
            type: String,
            required: [true, "First name required"],
            minlength: [2, "First name must be at least 2 characters"]
        },
        lastName: {
            type: String,
            required: [true, "Last name required"],
            minLength: [2, "Last name must be at least 2 characters"]
        },
        birthday: {
            type: Date,
            required: [true, "Birthday required"],
            max: [moment().subtract(18, "years").format("YYYY-MM-DD"), "Must be over 18"]
        },
        gender: {
            type: String,
            required: [true, "Gender required"]
        },
        password: {
            type: String,
            required: [true, "Password required"],
            minlength: [5, "Password must be at least 5 characters"]
        },
        height: {
            feet: {
                type: Number,
                default: "",
                max: 8
            },
            inches: {
                type: Number,
                default: "",
                min: 0,
                max: 11
            }
        },
        weight: {
            type: Number,
            default: ""
        },
        interests: [{
            type: String
        }],
        bio: {
            type: String
        },
        settings: {
            min: {
                type: Number,
                default: 18
            },
            max: {
                type: Number,
                default: 99
            },
            gender: {
                type: String,
                default: ""
            }
        },
        status: {
            type: Boolean,
            default: false
        },
        pictures: {
            type: Array,
            default: [
                "https://images.ctfassets.net/0jkr5d02o14t/4Tsq7upvRUHBdW4HwzeNEy/7f140b351543035dae54015d634c0df4/placeholder.png?h=250"
            ]
        },
        friends: [{
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Friend"
        }]
    }, { timestamps: true }
)

// Our UserSchema does not contain a field for a confirmPassword and it seems unnecessary to store that in the database. We can use mongoose virtuals to compare password with it without saving it in MongoDB. We chain calls to get and set to the returned virtual object, allowing us to establish both a getter and a setter for the virtual field
// set the confirmPassword in the virtual
userSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value));

// Pre middleware functions are executed one after another, when each middleware calls next.
// validate that the confirmPassword and password match
userSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match")
    }
    next();
})

// bcrypt the password before saving to the database
userSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

// install unique validator
userSchema.plugin(uniqueValidator, {message: "{PATH} is already taken"})

const User = Mongoose.model("User", userSchema);

module.exports = User;
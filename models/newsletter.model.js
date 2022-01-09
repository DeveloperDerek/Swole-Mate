const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const newsletterSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        }
    },
    {timestamps: true}
)

module.exports = Mongoose.model("Newsletter", newsletterSchema);
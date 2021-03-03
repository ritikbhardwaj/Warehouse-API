const mongoose = require("mongoose");
let userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        username: {
            firstName: { type: String,required: true},
            lastName: {type: String}
        },
        password: {
            type: String,
            required: true
        },
        dateJoined: {type: String, required: true}
    }
);

module.exports = mongoose.model("User", userSchema);
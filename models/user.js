var mongoose = require("mongoose"),
    passportlocalmongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    fullname: String,
    dateOfBirth: String,
    password: String,
    contact: Object,
    resume: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
    }],
    image: {
        imageurl: String,
        imageid: String
    }
})

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", userSchema);

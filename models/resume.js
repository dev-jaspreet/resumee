var mongoose = require("mongoose"),
    passportlocalmongoose = require("passport-local-mongoose");

var resumeSchema = mongoose.Schema({
    resumename: String,
    availability: String,
    project: Object,
    education: Object,
    certification: Object,
    skill: Object,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

resumeSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("Resume", resumeSchema);

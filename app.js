var express = require("express"),
    app = express(),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    compression = require("compression"),
    enforce = require('express-sslify'),
    mongoose = require("mongoose"),
    expressanitizer = require("express-sanitizer"),
    LocalStrategy = require('passport-local').Strategy,
    methodoverride = require("method-override"),
    session = require("express-session"),
    User = require("./models/user"),
    Resume = require("./models/resume");

var userRoutes = require("./routes/user"),
    resumeRoutes = require("./routes/resume");
    


mongoose.connect("mongodb+srv://jaspreet:singh@cluster0-aw4yr.mongodb.net/resumeOnTheWeb?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, autoIndex: true });

app.set("view engine", "ejs");
app.use(compression())
app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.use(express.static("public"));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(methodoverride("_method"));
app.use(expressanitizer());
app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentuser = req.user;
    res.locals.toast = req.flash("toast");
    res.locals.trigger = false;
    next();
})

app.use(userRoutes);
app.use(resumeRoutes);

app.get("/", function(req, res) {
    res.render("cover", { pageTitle: "My Resume" })
})

app.get("/index", function(req, res) {
    Resume.find({}).populate("user").exec(function(err, foundresumes) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("index", { pageTitle: "List of Resume(s)", foundresume: foundresumes })
        }
    })
})

//LISTENING
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("build runnig!!!")
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function(req, res, next) {
    if (req.protocol === "http") {
        return res.redirect("https://resumeontheweb-app-619.herokuapp.com/" + req.originalUrl);
    }
    next();
});


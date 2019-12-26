var express = require("express"),
    app = express(),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    expressanitizer = require("express-sanitizer"),
    LocalStrategy = require('passport-local').Strategy,
    methodoverride = require("method-override"),
    session = require("express-session"),
    User = require("./models/user"),
    Resume = require("./models/resume");

mongoose.connect("mongodb+srv://jaspreet:singh@cluster0-aw4yr.mongodb.net/resumeOnTheWeb?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, autoIndex: true });

app.set("view engine", "ejs");
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

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

app.get("/viewResume/:id", function(req, res) {
    Resume.findById(req.params.id).populate("user").exec(function(err, foundresume) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(foundresume)
            res.render("viewResume", { pageTitle: foundresume.user.fullname + "'s Resume", foundresume: foundresume, trigger: true })
        }
    })
})

app.get("/create", isLoggedIn, function(req, res) {
    res.render("create", { pageTitle: "Build your resume." })
})
app.get("/editresume/:id", function(req, res) {
    Resume.findById(req.params.id).populate("user").exec(function(err, foundresume) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(foundresume)
            res.render("edit", { pageTitle: "Edit Your Resume", foundresume: foundresume })
        }
    })
})
app.post("/create", isLoggedIn, function(req, res) {
    var project = {}
    var education = {}
    var certification = {}
    var skill = {}
    //PROJECT
    if (typeof(req.body.projecttitle) == "string") {
        project.title = (req.body.projecttitle).split()
        project.description = (req.body.projectdescription).split()
        project.url = (req.body.projecturl).split()
        project.startdate = (req.body.projectstartdate).split()
        project.enddate = (req.body.projectenddate).split()
    }
    else {
        project.title = req.body.projecttitle
        project.description = req.body.projectdescription
        project.url = req.body.projecturl
        project.startdate = req.body.projectstartdate
        project.enddate = req.body.projectenddate
    }
    // console.log(project)
    //EDUCATION
    if (typeof(req.body.educationtitle) == "string") {
        education.title = req.body.educationtitle.split()
        education.description = req.body.educationdescription.split()
        education.url = req.body.educationurl.split()
        education.startdate = req.body.educationstartdate.split()
        education.enddate = req.body.educationenddate.split()
    }
    else {
        education.title = req.body.educationtitle
        education.description = req.body.educationdescription
        education.url = req.body.educationurl
        education.startdate = req.body.educationstartdate
        education.enddate = req.body.educationenddate
    }
    //CERTFICATION
    if (typeof(req.body.certificationtitle) == "string") {
        certification.title = req.body.certificationtitle.split()
        certification.description = req.body.certificationdescription.split()
        certification.url = req.body.certificationurl.split()
        certification.startdate = req.body.certificationstartdate.split()
        certification.enddate = req.body.certificationenddate.split()
    }
    else {
        certification.title = req.body.certificationtitle
        certification.description = req.body.certificationdescription
        certification.url = req.body.certificationurl
        certification.startdate = req.body.certificationstartdate
        certification.enddate = req.body.certificationenddate
    }
    //SKILL
    if (typeof(req.body.skilltitle) == "string") {
        skill.title = req.body.skilltitle.split()
    }
    else {
        skill.title = req.body.skilltitle

    }
    Resume.create({}, function(err, created) {
        if (err) {
            console.log(err)
        }
        else {
            User.findById(req.user.id, function(err, founduser) {
                if (err) {
                    console.log(err)
                }
                else {
                    founduser.resume.push(created._id)
                    founduser.save()
                }
            })
            created.resumename = req.body.resumename
            created.project = project
            created.education = education
            created.certification = certification
            created.skill = skill
            created.user = req.user._id
            created.save()
            // console.log(created)
            res.redirect("/index")
        }
    })
})

app.put("/updateResume/:id", function(req, res) {
    var project = {}
    var education = {}
    var certification = {}
    var skill = {}
    //PROJECT
    if (typeof(req.body.projecttitle) == "string") {
        project.title = (req.body.projecttitle).split()
        project.description = (req.body.projectdescription).split()
        project.url = (req.body.projecturl).split()
        project.startdate = (req.body.projectstartdate).split()
        project.enddate = (req.body.projectenddate).split()
    }
    else {
        project.title = req.body.projecttitle
        project.description = req.body.projectdescription
        project.url = req.body.projecturl
        project.startdate = req.body.projectstartdate
        project.enddate = req.body.projectenddate
    }
    // console.log(project)
    //EDUCATION
    if (typeof(req.body.educationtitle) == "string") {
        education.title = req.body.educationtitle.split()
        education.description = req.body.educationdescription.split()
        education.url = req.body.educationurl.split()
        education.startdate = req.body.educationstartdate.split()
        education.enddate = req.body.educationenddate.split()
    }
    else {
        education.title = req.body.educationtitle
        education.description = req.body.educationdescription
        education.url = req.body.educationurl
        education.startdate = req.body.educationstartdate
        education.enddate = req.body.educationenddate
    }
    //CERTFICATION
    if (typeof(req.body.certificationtitle) == "string") {
        certification.title = req.body.certificationtitle.split()
        certification.description = req.body.certificationdescription.split()
        certification.url = req.body.certificationurl.split()
        certification.startdate = req.body.certificationstartdate.split()
        certification.enddate = req.body.certificationenddate.split()
    }
    else {
        certification.title = req.body.certificationtitle
        certification.description = req.body.certificationdescription
        certification.url = req.body.certificationurl
        certification.startdate = req.body.certificationstartdate
        certification.enddate = req.body.certificationenddate
    }
    //SKILL
    if (typeof(req.body.skilltitle) == "string") {
        skill.title = req.body.skilltitle.split()
    }
    else {
        skill.title = req.body.skilltitle

    }
    Resume.findByIdAndUpdate(req.params.id, {}, function(err, savedresume) {
        if (err) {
            console.log(err)
        }
        else {
            savedresume.resumename = req.body.resumename
            savedresume.project = project
            savedresume.education = education
            savedresume.certification = certification
            savedresume.skill = skill
            // savedresume.user = req.user._id
            savedresume.save()
            console.log(savedresume)
            res.redirect("/viewResume/" + req.params.id)
        }
    })
})
app.post("/register", function(req, res) {
    if (req.body.password === req.body.passwordConfirm) {
        User.register(new User({
                username: req.body.email,
                fullname: req.body.fullname,
                DateOfBirth: req.body.dob,
                email: req.body.email
            }),
            req.body.password,
            function(err, newUser) {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                }
                else {
                    req.flash("toast", "Registration Complete.");
                    res.redirect("/")
                }
            }
        )
    }
})
app.post("/updateContact/:id", function(req, res) {
    User.findById(req.params.id, function(err, founduser) {
        if (err) {
            console.log(err)
        }
        else {
            var contact = {};

            contact.email = req.body.email
            contact.mobile = req.body.mobile
            contact.linkedin = req.body.linkedin
            contact.facebook = req.body.facebook
            contact.address = req.body.address
            founduser.contact = contact
            founduser.save()
            res.redirect("/user/" + req.params.id)
        }
    })
})
app.get("/user/:id", function(req, res) {
    User.findById(req.params.id).populate("resume").exec(function(err, founduser) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(founduser)
            res.render("user", { pageTitle: founduser.fullname + "'s Account Setting.", founduser: founduser })
        }
    })
})

app.get("/deleteresume/:id", function(req, res) {
    User.findById(req.user._id, function(err, founduser) {
        if (err) {
            console.log(err)
        }
        else {
            for (var i = 0; i < founduser.resume.length; i++) {
                founduser.resume.remove(req.params.id)
            }
            founduser.save()
        }
    })
    Resume.findByIdAndDelete(req.params.id, function(err) {
        console.log(err)
    })
    res.redirect("/user/" + req.user._id)
})
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/'
    }),
    function(req, res) {}
);

// LOGOUT
app.get('/logout', function(req, res) {
    req.logout();
    // req.flash("toast", "Logged You Out.")
    res.redirect('/');
});

//LISTENING
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("build runnig!!!")
})

var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    Resume = require("../models/resume"),
    middleware = require("../middleware/function");


router.get("/viewResume/:id", function(req, res) {
    Resume.findById(req.params.id).populate("owner").exec(function(err, foundresume) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("viewResume", { pageTitle: foundresume.owner.fullname + "'s Resume", foundresume: foundresume, trigger: true })
        }
    })
})

router.get("/create", middleware.isLoggedIn, function(req, res) {
    res.render("create", { pageTitle: "Build your resume." })
})
router.get("/editresume/:id", function(req, res) {
    Resume.findById(req.params.id).populate("user").exec(function(err, foundresume) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("edit", { pageTitle: "Edit Your Resume", foundresume: foundresume })
        }
    })
})
router.post("/create", middleware.isLoggedIn, function(req, res) {
    var project = {}
    var education = {}
    var certification = {}
    var skill = {}
    //PROJECT 
    // console.log(req.body)
    if (req.body) {
        if (req.body.projecttitle) {
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
        }
        //EDUCATION
        if (req.body.educationtitle) {
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
        }
        //CERTFICATION
        if (req.body.certificationtitle) {
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
        }
        //SKILL
        if (req.body.skilltitle) {
            if (typeof(req.body.skilltitle) == "string") {
                skill.title = req.body.skilltitle.split()
            }
            else {
                skill.title = req.body.skilltitle
            }
        }
    }
    // req.body.project = project
    // req.body.education = education
    // req.body.certification = certification
    // req.body.skill = skill
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
            created.owner = req.user._id
            created.save()
            res.redirect("/index")
        }
    })
})

router.put("/updateResume/:id", function(req, res) {
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
            savedresume.save()
            res.redirect("/viewResume/" + req.params.id)
        }
    })
})

router.get("/deleteresume/:id", function(req, res) {
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

module.exports = router;
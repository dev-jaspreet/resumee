var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


router.post("/register", function(req, res) {
    if (req.body.password === req.body.passwordConfirm) {
        User.register(new User({
                username: req.body.email,
                fullname: req.body.fullname,
                DateOfBirth: req.body.dob,
            }),
            req.body.password,
            function(err, newUser) {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                }
                else {
                    var contact = {};
                    contact.email = req.body.email
                    newUser.contact = contact;
                    newUser.save()
                    req.flash("toast", "Registration Complete.");
                    res.redirect("/")
                }
            }
        )
    }
})

router.post("/updateContact/:id", function(req, res) {
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
router.get("/user/:id", function(req, res) {
    User.findById(req.params.id).populate("resume").exec(function(err, founduser) {
        if (err) {
            console.log(err)
        }
        else {
            // console.log(founduser)
            req.flash("toast", "Hi there!")
            res.render("user", { pageTitle: founduser.fullname + "'s Account Setting.", founduser: founduser })
        }
    })
})

// LOGIN

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/'
    }),
    function(req, res) {}
);
// LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    req.flash("toast", "Logged You Out.")
    res.redirect('/');
});

module.exports = router;
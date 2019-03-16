var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var User = require("../models/user");
var passport = require("passport");

router.get("/home" , function(req, res){
    res.render("home");
})

router.get("/" , function(req , res){
    //find all blogs
    Blog.find({} , function(err , blogs){
      if(err){
          console.log(err);
      } 
      else{
          res.redirect("/home");
      }
    });
    
});
//=====================
// AUTH ROUTES
//=====================

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message );
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome, " + user.username + "!");
                res.redirect("/blogs");
            })
        }
    });
})

 //show login form
router.get("/login", function(req, res){
    res.render("login");
    
});

//add login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/blogs");
});

module.exports = router;
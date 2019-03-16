var Blog = require("../models/blog");
var express = require("express");
var router = express.Router();
var middleware = require("../middleware");



//INDEX ROUTE
router.get("/blogs" , function(req , res){
    //find all blogs
    Blog.find({} , function(err , blogs){
       if(err){
           console.log(err);
       } 
       else{
           res.render("blogs/index" , {blogs : blogs});
       }
    });
    
});

//NEW ROUTE
router.get("/blogs/new", middleware.isLoggedIn, function(req , res){
    res.render("blogs/new");
});

// CREATE ROUTE
router.post("/blogs", middleware.isLoggedIn, function(req , res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    req.body.blog.author = author;
    Blog.create(req.body.blog , function(err , newBlog){
        if(err){
            res.redirect("/blogs/new");
        }
        else{
            res.redirect("/blogs");
        }
    })   
});

//SHOW ROUTE
router.get("/blogs/:id" , function(req , res){
    Blog.findById(req.params.id).populate("comments").exec(function(err , foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("blogs/show" , {blogs: foundBlog, currentUser: req.user})
        }
        
    })
});

//EDIT ROUTE
router.get("/blogs/:id/edit", middleware.checkBlogOwnership, function(req , res){
    Blog.findById(req.params.id , function(err, foundBlog){
        res.render("blogs/edit" , {blogs: foundBlog});                    
    });       
});

//UPDATE ROUTE
router.put("/blogs/:id", middleware.checkBlogOwnership, function(req , res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog , function(err ,updatedComment){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
    
});

//DESTROY ROUTE
router.delete("/blogs/:id", middleware.checkBlogOwnership, function(req , res){
    Blog.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
});

module.exports = router;
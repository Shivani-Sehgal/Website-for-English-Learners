var Comment = require("../models/comment");
var Blog = require("../models/blog");

var express = require("express");
var router = express.Router();
var middleware = require("../middleware");


// ==================================
// COMMENTS ROUTES
// ==================================

//NEW ROUTE
router.get("/blogs/:id/comments/new", middleware.isLoggedIn, function(req , res){
    Blog.findById(req.params.id , function(err , blogs){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new" , {blogs: blogs});
        }
    })
});

//CREATE ROUTE
router.post("/blogs/:id/comments" , middleware.isLoggedIn, function(req , res){
    //lookup blog
    Blog.findById(req.params.id , function(err , foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            Comment.create(req.body.comment , function(err , comment){
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }else{
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    foundBlog.comments.push(comment);
                    foundBlog.save(comment);
                    req.flash("success", "Comment added successfully!");
                    res.redirect("/blogs/" + foundBlog._id);
                    
                }
            });
        }
    })
})

//EDIT ROUTE
router.get("/blogs/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {blog_id: req.params.id, comment: foundComment});
        }
    })
})

//UPDATE ROUTE
router.put("/blogs/:id/comments/:comment_id", middleware.checkCommentOwnership,  function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

//DESTROY ROUTE
router.delete("/blogs/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted.");
            res.redirect("/blogs/"+req.params.id);
        }
    })
})


module.exports = router;
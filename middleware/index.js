var Blog = require("../models/blog");
var Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next){
 //is the user logged in?
  if(req.isAuthenticated()){
        Blog.findById(req.params.id , function(err, foundBlog){
            if(err){
                res.redirect("back");
            }else{
                //does the user own the blog?
                if(foundBlog.author.id.equals(req.user._id)){
                    next();
                }else{
                    //if not, redirect 
                    req.flash("error", "You don't have the permission to do that.");
                    res.redirect("back");
                }

            }
        })       
  }else{
        //if not,redirect 
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
  } 
    
}

middlewareObj.checkCommentOwnership = function(req, res, next){
 //is the user logged in?
   if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id , function(err, foundComment){
            if(err){
                req.flash("error", "Post not found.");
                res.redirect("back");
            }else{
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have the permission to do that.");
                    //if not, redirect 
                    res.redirect("back");
                }

            }
        })       
   }else{
       req.flash("error", "You need to be logged in to do that.");
        //if not,redirect 
        res.redirect("back");
   } 
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}



module.exports = middlewareObj
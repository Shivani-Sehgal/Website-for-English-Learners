var mongoose = require("mongoose"),
    Comments  = require("./models/comment"),
    Blog     = require("./models/blog"),
    data     = [
        {
            name:"15 COMMON ENGLISH IDIOMS AND PHRASES WITH THEIR MEANING",
            image:"https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-0.3.5&s=c1058ecb478c4833b4cbf3133d7d10f1&auto=format&fit=crop&w=1050&q=80",
            body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"How to practice speaking English when you have no one to practice with?",
            image:"https://images.unsplash.com/photo-1509616998492-816f601f12d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e8877da66ee81726230a8a8011b46bf&auto=format&fit=crop&w=500&q=60",
            body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"How to practice speaking English when you have no one to practice with?",
            image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-0.3.5&s=c0ac25c3cd56ced9821b924fed4c3c43&auto=format&fit=crop&w=750&q=80",
            body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"How to practice speaking English when you have no one to practice with?",
            image:"https://images.unsplash.com/38/awhCbhLqRceCdjcPQUnn_IMG_0249.jpg?ixlib=rb-0.3.5&s=3a036c9e9439a3e76b42e10bd7d2c577&auto=format&fit=crop&w=1267&q=80",
            body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        ];
    
// function seedDb(){
    // Blog.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("Blogs removed!");
    //     }
        // data.forEach(function(seed){
        //     Blog.create(seed , function(err , blog){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("New blog added");
        //             Comments.create({
        //                 text:"Great post!",
        //                 author:"Homer"
        //             }, function(err , comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     blog.comments.push(comment);
        //                     blog.save(function(err , data){
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             console.log("created a comment");
                                    
        //                         }
        //                     })
        //                 }
        //             })
        //         }
        //     })
        // })
//     })
// }

module.exports = seedDb;
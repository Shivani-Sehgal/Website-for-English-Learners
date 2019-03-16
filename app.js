var expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    Blog             = require("./models/blog"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    localStrategy    = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    request          = require("request"),
    Comments         = require("./models/comment"),
    app              = express(),
    User             = require("./models/user");
    // seedDb           = require("./seed");
    
var commentsRoutes = require("./routes/comments"),
    blogRoutes     = require("./routes/blogs"),
    indexRoutes    = require("./routes/index");

// seedDb();

// mongoose.connect("mongodb://localhost/restful_blog_app");
mongoose.connect("mongodb+srv://shivani31:hello@englishlearnercluster-sabks.mongodb.net/test?retryWrites=true");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

 //PASSPORT CONFIGURATION
 app.use(require("express-session")({
     secret:"Rusty is the cutest dog",
     resave: false,
     saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     next();
 });
 
 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
 });

// Blog.create({
//   name : "Avoid using the word 'very' ",
//   image : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   body : "Buy Camera Accessories at India's Best Online Shopping Store. Choose from a huge range of camera accessories from top brands. ✓Best Offers ✓COD.",
   
// });

//ROUTES
//=========================
// GRAMMAR AND VOCAB ROUTES
// ========================
app.get("/input", function(req , res){
    res.render("input");
});


app.get("/result", function(req , res){
    var query = req.query.check;
    var url = "https://api.textgears.com/check.php?text=" + query + "&key=Zzs4337GjtgtKMhj";
    request(url, function(error , response , body){
        if(!error && response.statusCode == 200 ){
            var data = JSON.parse(body)
            // 
            res.render("results" , {data: data});
            
        }
        
    });
    
});

app.use("/assets" ,express.static(__dirname + "/public"))

app.use("/vocab",express.static("./try"))

app.use(indexRoutes);
app.use(commentsRoutes);
app.use(blogRoutes);
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog server has started !");
})
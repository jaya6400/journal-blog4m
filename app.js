
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv")

const homeStartingContent = "The blinking light caught her attention. She thought about it a bit and couldn't remember ever noticing it before. That was strange since it was obvious the flashing light had been there for years. Now she wondered how she missed it for that amount of time and what other things in her small town she had failed to notice.";
const aboutContent = "Hey friend! this is me Jaya a women developer who is facinated about new web technologies and likes dwelling, exploring them. Here, I will be sharing my knowledge through My Blogs. Hope this journey will be enchanting!";
const contactContent = "Feel free to connect with me on socials Linkedin - https://www.linkedin.com/in/jaya-dubey-1196b5165/ Twitter - https://twitter.com/Jaya_0042";
require('dotenv').config();
const app = express();
//dotenv.config();
var path = require('path')
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//mongo db database connection
//mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

// mongoose.connect("mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a3cpn.mongodb.net/blogDB", {useNewUrlParser: true},
//   (err)=>{
//   if(err) throw err;
//   console.log("DB Connected Successfully");
//   });

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
  if(err) throw err;
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  
  post.save(function(err){
    if(!err)
    res.redirect("/");
});
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  });
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }
app.listen(port, function() {
  console.log("Server running successfully");
});

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hi, it's Muhfat Alam. I'm Junior at John Jay College of Criminal Justice. Welcome to my personal blog post. To add more post just add /compose after the url.";
const aboutContent = "From a kid, I was passionate about technology and science. My favorite subject was chemistry. However, I was advance in computer technology. I'm good at Microsoft and Adobe. Right now I'm working on computer science to learn more about computer programming and Technology. Also, I have a lot of gadgets which I used in my daily life.";
const contactContent = "I'm always looking for new and exciting opportunities. Let's connect. baisakhmuhfat@yahoo.com +1 (929) 219 8850";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts= [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  }); //{key:value}

});

app.get("/about", function(req, res){
  res.render("about", {aboutPage: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactPage: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
const post = {
  title: req.body.postTitle,
  content: req.body.postBody
};
posts.push(post)
res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

//initialize connection with sequelize then test connection
const sequelize = new Sequelize('postgres://postgres:1029384756@localhost:5432/blogpost');
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.set('view engine', 'ejs');
//sets this application to look at `my-views` next to the running application
app.set('views', './views');

//for error cannot find module ejs, just ndm install ejs

app.use(express.static(__dirname));


app.get('/home', function(req, res){
  //renders the `home-page` view in `views`
  res.render('home-page');
});

app.get('/portfolio', function(req, res){
  res.render('portfolio');
})

app.get('/blog', function(req, res){
  res.render('blog');
});

app.get('/blogpost', function(req, res){
  res.render('blogpost');
});

function redirect(){
  res.render('home-page');
}

app.get('*', function(req,res){
  res.status(404).send('Page not found');
});

app.listen(3000, function() {
  console.log('Listening on port 3000')
});

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//adds blog post to database
function newBlogPost(){
  var title = document.getElementById('title').value;
  var content = document.getElementById('content').value;
  var Entries= sequelize.define('entries', {
    title: Sequelize.STRING,
    content: Sequelize.STRING
  }).sync().then(function(){
    Entries.create({
      title: title,
      content: content
    });
    console.log("Success!");
  });
}

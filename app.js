var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

var pg = require('pg');
var conString = 'postgres://postgres:talesh100996@localhost/blogpost';
var client = new pg.Client(conString);
client.connect();
//create tables for blog posts and comments, but only once
var query= client.query( 'CREATE TABLE IF NOT EXISTS entries(title VARCHAR(255) NOT NULL, content TEXT)');
  query.on('end', () => { client.end(); });
// var query2= client.query('CREATE TABLE IF NOT EXISTS comments(id SERIAL NOT NULL PRIMARY KEY, first_name VARCHAR(255),last_name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL UNIQUE,created_at DATETIME NOT NULL DEFAULT');
//   query.on('end', () => { client.end(); });
//set the view engine to hbs for handlebars, ejs for ejs, or pug for pug
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

app.post('/blogpost', function(req,res){
  //parse html form and save to database, both title and content
  var btitle = req.body.title;
  var bcontent = req.body.content;
  pg.connect('conString', function(err, client, done){
       // Handle connection errors
   if(err) {
     done();
     console.log(err);
     return res.status(500).json({success: false, data: err});
   }

    client.query('INSERT INTO blogpost (title, content) values (btitle, bcontent)')
  }}));


function loadcommentposter(){

}

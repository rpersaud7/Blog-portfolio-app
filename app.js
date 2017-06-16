var express = require('express');
var app = express();

//const pg = require('pg');
//const conString = 'postgres://postgres:talesh100996@localhost/blog_db';
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
  setTimeout(redirect(), 5000);
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

// function post(){
//   pg.connect('conString', function(err, client, done){
//     client.query('insert into posts,bodyParser.')  //parse html form and save to database, both title and content
//   });
// }

function loadcommentposter(){

}

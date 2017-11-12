'use strict';

const express = require('express');
const app = express();
const PORT = 1337;
const routes = require('./routes');
const nunjucks = require('nunjucks');
const tweetBank = require('./tweetBank');
const fs = require('fs');
const path = require('path');
// WHAT IS PATH????
const mime = require('mime');
// WHAT IS MIME???
const bodyParser = require('body-parser');

// var locals = {
//   title: 'An Example',
//   people: [{
//       name: 'Gandalf'
//     },
//     {
//       name: 'Frodo'
//     },
//   ]
// };

// DEBUGGING TOOL
// This portion is getting  our app to communicate to our app what is being req/res
app.use((req, res, next) => {
  // This is a built in method of node where everytime server recieved a req and sends res, we can get it
  res.on('finish', () => {
    console.log('requested:', req.method, req.path, 'response: ', res.statusCode);
  });
  next();
});


// We can install morgan to help us do the same as above
// const morgan = require('morgan');
// var logger = morgan('dev');
// app.use(logger); // Get / 200 2.145 ms -22 <- we get the VERB / URI / runtime etc


// THIS WILL RENDER IN APP OBJ?
// nunjucks.render('index.html', locals, function (err, output) {
//   if (err) return console.error(err);
//   console.log(output)
// });

// THIS IS BOILER PLATE TO SET UP HTML RENDERING IN EXPRESS
nunjucks.configure('views', {
  noCache: true
});
app.set('views', __dirname + '/views') //where to find the views
// __dirname <- finds the exact location of file
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', nunjucks.render); // how to render html templates

// In-App way to render HTML (look at locals obj above)
// app.get('/', (req, res) => {
//   res.render('index', locals);
// });

// this is the typical way to use express static middleware
// making the file a static file aka anyoe can access the file
// ie --> you can see style.css when using (localhost:PORT or www.etc.)/public/stylesheets/style.css
app.use(express.static(path.join(__dirname, '/public')));

//// what is express.static doing???
// var statisMiddleware = express.static(__firname + '/public');
// function staticMiddleware (req, res, next) {
//// finds the associated file in our system
//// if err, move on (call next) => err meaning file does not exist
//// otherwise, res.send that file with the correct with the correct headers
// //}

app.use(bodyParser.urlencoded({
  extend: true
})); // FOR HTML form submits

app.use(bodyParser.json()); // FOR AJAX requests

app.use('/', routes);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

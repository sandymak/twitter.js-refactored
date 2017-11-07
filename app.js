'use strict'
const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const nunjucks = require('nunjucks');
const tweetBank = require('./tweetBank');

// This portion is getting  our app to communicate to our app what is being req/res
app.use((req, res, next) => {
  // This is a built in method of node where everytime it recieved a req and sends res, we can get it
  res.on('finish', () => {
    console.log('requested:', req.method, req.path, 'response: ', req.statusCode);
  });
  next();
});

// We can install morgan to help us do the same as above
// const morgan = require('morgan');
// var logger = morgan('dev');
// app.use(logger); // Get / 200 2.145 ms -22 <- we get the VERB / URI / runtime etc

app.use(routes);


app.set('views', __dirname + '/views')

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

nunjucks.configure('views', {
  noCache: true
});

var locals = {
  title: 'An Example',
  people: [{
      name: 'Gandalf'
    },
    {
      name: 'Frodo'
    },
    {
      name: 'Hermione'
    }
  ]
};

nunjucks.render('index.html', locals, function (err, output) {
  // res.send(output);
  if (err) return console.error(err);
  console.log(output)
});


// // Different way to render HTML
// // app.get('/views', (req, res) => {
// //   nunjucks.render('index.html', locals, function (err, output) {
// //     res.send(output);
// //     // console.log(output)
// //   });
// // });

// app.get('/views', (req, res) => {
//   const people = [{
//     name: 'Full'
//   }, {
//     name: 'Stacker'
//   }, {
//     name: 'Son'
//   }];
//   res.render('index', {
//     title: 'Hall of Fame',
//     people: people
//   });
// });

// console.log(tweetBank.find());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

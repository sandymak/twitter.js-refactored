'use strict';

const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweets
  });
});

// THIS IS THE LONG AND CLUNKY WAY TO ROUTE CSS
router.get('/stylesheets/style.css', function (req, res) {
  res.sendFile('/stylesheets/style.css', {
    root: __dirname + '/../public/'
  });
});

module.exports = router;

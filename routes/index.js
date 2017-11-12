'use strict';

const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res, next) {

  let allTheTweets = tweetBank.list();
  res.render('index', {
    title: 'Twitter.js',
    tweets: allTheTweets,
    showForm: true
  });
});

router.get('/users/:name', function (req, res, next) {
  console.log('req.query', req.params);
  let tweetForName = tweetBank.find({
    name: req.params.name
  });
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetForName,
    showForm: true,
    username: req.params.name
  });
});

router.get('/tweets/:id', function (req, res, next) {
  let tweetsWithThatID = tweetBank.find({
    id: +req.params.id
  });
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetsWithThatID
  });
});

router.post('/tweets', function (req, res, next) {
  tweetBank.add(req.body.name, req.body.text);
  res.redirect('/');
});

// THIS IS THE LONG AND CLUNKY WAY TO ROUTE CSS
router.get('/stylesheets/style.css', function (req, res) {
  res.sendFile('/stylesheets/style.css', {
    root: __dirname + '/../public/'
  });
});

module.exports = router;

'use strict'
const _ = require('lodash');
const data = [];

function add(name, content) {
  data.push({
    name: name,
    content: content,
    id: data.length
  });
}

function list() {
  return _.cloneDeep(data);
  // create obj that look similar but are not the same
  // people who use the array/obj will be able to use it without mutilating the arry
}

function find(properties) {
  return _.cloneDeep(_.filter(data, properties));
  // return array for only properties we pass in
}

module.exports = {
  add: add,
  list: list,
  find: find
};

const randArrayEl = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function () {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function () {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add(getFakeName(), getFakeTweet());
}

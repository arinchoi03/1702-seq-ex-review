var express = require('express');
var router = express.Router();

var Cat = require('./models').Cat;

module.exports = router;

router.get('/orangefluff', function(req, res, next) {
  Cat.findFluffyOrangeCats()
    .then(function(cats) {
      res.send(`There is/are ${cats.length} fluffy orange cat(s)!`)
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  Cat.findById(req.params.id)
    .then(function(cat) {
      res.send(`${cat.name} is a(n) ${cat.description} cat!`);
    })
    .catch(next);
});

router.post('/:name', function(req, res, next) {
  Cat.create({
    name: req.params.name,
    fluffiness: Math.random() > 0.5 ? 'shorthaired' : 'longhaired',
    color: req.query.color,
    wuv: Math.ceil(Math.random() * 10)
  })
    .then(res.sendStatus(201))
    .catch(next);
});

//note in post route above that you have access to any given query string a user
//puts in the path but you do NOT make query strings part of your first
//argument given to .post

router.put('/:id/groom', function(req, res, next) {
  Cat.findById(req.params.id)
    .then(function(cat) {
      cat.grooming();
    })
    .then(function() {
      res.send(`Someone got a haircut!`)
    })
    .catch(next);
});

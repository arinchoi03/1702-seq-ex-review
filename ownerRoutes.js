var express = require('express');
var router = express.Router();

var Cat = require('./models').Cat;
var Owner = require('./models').Owner;

module.exports = router;

router.get('/', function(req, res, next) {
  res.send(`Let's hang out with cats!`);
});

router.get('/:id', function(req, res, next) {
  Owner.findById(req.params.id)
    .then(function(owner) {
      res.send(owner.isCrazyCatPerson());
    })
    .catch(next);
});

router.post('/:name', function(req, res, next) {
  Owner.create({
    name: req.params.name,
    craziness: Math.ceil(Math.random() * 10)
  })
    .then(res.sendStatus(201))
    .catch(next);
});


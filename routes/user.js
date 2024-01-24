const express = require('express');
const router = express.Router();

const users = require('../controllers/user');

router.get('/', users.getAll);

router.get('/:id', users.getSingle);

router.post('/', users.createUser);

router.put('/:id', users.updateUser);

router.delete('/:id', users.deleteUser);

module.exports = router;

/*
const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);
routes.get('/:temple_id', temples.findOne);

routes.post('/', temples.create);

module.exports = routes;
*/
const routes = require('express').Router();
const user = require('./user');

routes.use('/', require('./swagger'))

routes.get('/', (req,res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World!");
});

routes.use('/users', user);

module.exports = routes; 

/*
const routes = require('express').Router();
const temple = require('./temple');

routes.use('/temples', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
*/
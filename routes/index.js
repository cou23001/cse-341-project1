const router = require('express').Router();
const users = require('./users');

router.use('/', require('./swagger'))


router.get('/', (req,res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World!");
});


router.use('/users', users);

module.exports = router; 
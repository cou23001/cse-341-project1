const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    //const result = await mongodb.getDb().db().collection('users').find();
    //result.toArray().then((users) => {
    //    res.setHeader('Content-Type','application/json');
    //    res.status(200).json(users);
    //});
    User.find(
        {},
        {
          email: 1,
          username: 1,
          name: 1,
          ipaddress: 1,
          _id: 0,
        }
      )
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving temples.',
          });
        });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId});
    
    result.toArray().then((users) => {
        if (users.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        }
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the user. ');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDb().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user. ');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user. ');
    }
};

module.exports = { 
    getAll, 
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
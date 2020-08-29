const express = require('express');
const db = require('../database/dbConfig.js');
const restricted = require('../Auth/restricted-middleware.js');

const router = express.Router();

router.get('/', restricted, (req,res) => {
    db('for-sale')
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message:'Failed to retrieve data', err})
    });
});

router.get('/:id', (req,res) => {
    const { id } = req.params;
    
    db('for-sale').where({id}).first()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve data', err});
    });
});

router.post('/', (req,res) => {
    const businessInfo = req.body;

    db('for-sale').insert(businessInfo)
    .then(ids => {
        db('for-sale').where( {id: ids[0]})
        .then(business => {
            res.status(201).json(business);
        })
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to store the new business', err})
    });
});

router.put('/:id', restricted, (req,res) => {
    const { id }= req.params;
    const businessInfo = req.body;

    db('for-sale').where({id}).update(businessInfo)
    .then(data => {
        if(data) {
            res.status(200).json({ message: 'Update Successful!'});
        } else {
            res.status(404).json({ message: 'The business you are trying to update appears to not exist'});
        };
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong while trying to update', err});
    })
});

router.delete('/:id', restricted, (req,res) => {
    const {id} = req.params;

    db('for-sale').where({id}).del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The business has been removed'})
        } else {
            res.status(404).json({ message: 'User does not exist'})
        };
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong while trying to delete', err});
    });
});
module.exports = router;
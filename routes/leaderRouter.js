const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('content-Type', 'text/plain');
//     next();
// })
.get((req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leader)=> {
        console.log('leader Created: ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
    // res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusMessage = 403;
    res.end("PUT aperation not supported on /leader");
})

// dangerous operation
.delete((req, res, next) =>{
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    //res.end('Deleting all leader');
});

leaderRouter.route("/:leaderId")
.get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
    //res.end('will send details of the promo: ' + req.params.promoId + " to you!");
})

.post((req, res, next) => { 
    res.statusMessage = 403;
    res.end("POST aperation not supported on /leader/" + req.params.leaderID);
})

.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
    // res.write('Updating the dish: ' + req.params.promoId);
    // res.end('Will update the dish ' + req.body.name+ ' with details: ' + req.body.description + '\n'); 
})

.delete((req, res, next) =>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    //res.end('Deleting dishes: ' + req.params.promoId);
});

module.exports = leaderRouter;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const promoRouter = express.Router();
const Promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());


promoRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('content-Type', 'text/plain');
//     next();
// })
.get((req, res, next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion created: ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusMessage = 403;
    res.end("PUT aperation not supported on /promo");
})

// dangerous operation
.delete((req, res, next) =>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

promoRouter.route("/:promoId")
.get((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
    //res.end('will send details of the promo: ' + req.params.promoId + " to you!");
})

.post((req, res, next) => { 
    res.statusMessage = 403;
    res.end("POST aperation not supported on /promo/" + req.params.promoId);
})

.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true})
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
    // res.write('Updating the dish: ' + req.params.promoId);
    // res.end('Will update the dish ' + req.body.name+ ' with details: ' + req.body.description + '\n'); 
})

.delete((req, res, next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    //res.end('Deleting dishes: ' + req.params.promoId);
});

module.exports = promoRouter;
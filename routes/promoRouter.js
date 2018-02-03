const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("will send all the promotion to you!");
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
   })
.put((req, res, next) => {
    res.statusMessage = 403;
    res.end("PUT aperation not supported on /promo");
})

// dangerous operation
.delete((req, res, next) =>{
    res.end('Deleting all promo');
});

promoRouter.route("/:promoId")
.get((req, res, next) => {
    res.end('will send details of the promo: ' + req.params.promoId + " to you!");
})

.post((req, res, next) => { 
    res.statusMessage = 403;
    res.end("POST aperation not supported on /promo/" + req.params.promoId);
})

.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.promoId);
    res.end('Will update the dish ' + req.body.name+ ' with details: ' + req.body.description + '\n'); 
})

.delete((req, res, next) =>{
    res.end('Deleting dishes: ' + req.params.promoId);
});

module.exports = promoRouter;
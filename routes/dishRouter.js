const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("will send all the dishes to you!");
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
   })
.put((req, res, next) => {
    res.statusMessage = 403;
    res.end("PUT aperation not supported on /dishes");
})

// dangerous operation
.delete((req, res, next) =>{
    res.end('Deleting all dishes');
});

dishRouter.route("/:dishID")
.get((req, res, next) => {
    res.end('will send details of the dish: ' + req.params.dishID + " to you!");
})

.post((req, res, next) => { 
    res.statusMessage = 403;
    res.end("POST aperation not supported on /dishes/" + req.params.dishID);
})

.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishID);
    res.end('Will update the dish ' + req.body.name+ ' with details: ' + req.body.description + '\n'); 
})

.delete((req, res, next) =>{
    res.end('Deleting dishes: ' + req.params.dishID);
});

module.exports = dishRouter;
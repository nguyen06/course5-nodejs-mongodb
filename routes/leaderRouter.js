const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("will send all the leaders to you!");
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
   })
.put((req, res, next) => {
    res.statusMessage = 403;
    res.end("PUT aperation not supported on /leader");
})

// dangerous operation
.delete((req, res, next) =>{
    res.end('Deleting all leader');
});

leaderRouter.route("/:leaderId")
.get((req, res, next) => {
    res.end('will send details of the leaders: ' + req.params.leaderId + " to you!");
})

.post((req, res, next) => { 
    res.statusMessage = 403;
    res.end("POST aperation not supported on /leader/" + req.params.leaderId);
})

.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId);
    res.end('Will update the leader: ' + req.body.name+ ' with details: ' + req.body.description + '\n'); 
})

.delete((req, res, next) =>{
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;
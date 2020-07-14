const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

//BASE ROUTE is when there are no params in the request
partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partner to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all partners');
});

//Runs when there is a parameter in the request
partnerRouter.route('/:partners')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    // res.end('Will send all the partners to you');
    res.end("Get partner: "+req.params.partners)
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT '+req.params.partners);
})
.delete((req, res) => {
    res.end('Deleting partner: '+req.params.partners );
});





module.exports = partnerRouter;


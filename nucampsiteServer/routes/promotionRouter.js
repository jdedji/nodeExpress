const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');
const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

//BASE ROUTE
promotionRouter.route('/')

// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
.get((req, res, next) => {
    Promotion.findById(req.params.promotions)
    .then(promotion => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion.comments);
 })  
    .catch(err => next(err));      
    // res.end('Will send all the Promotion to you');
})
.post(authenticate.verifyUser,(req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//Runs when there is a parameter in the request
promotionRouter.route('/:promotions')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
.get((req, res, next) => {
    Promotion.findById(req.params.promotions)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})

.post(authenticate.verifyUser,(req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})

.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT '+req.params.promotions);
})

.delete(authenticate.verifyUser,(req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res) => {
//     res.end('Will send all the promotion to you');
// })
// .post((req, res) => {
//     res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
// })
// .put((req, res) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /campsites');
// })
// .delete((req, res) => {
//     res.end('Deleting all campsites');
// });


// campsiteRouter.route('/:promotions')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
// .get((req, res) => {
//     // res.end('Will send all the campsites to you');
//     res.end("Get promotion: "+req.params.promotions)
// })
// .post((req, res) => {
//     res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
// })
// .put((req, res) => {
//     res.statusCode = 403;
//     res.end('PUT '+req.params.promotions);
// })
// .delete((req, res) => {
//     res.end('Deleting promotion: '+req.params.promotions );
// });





module.exports = promotionRouter;


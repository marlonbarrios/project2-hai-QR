const apiRouter = require('express').Router();
const Haiku = require('../models/haiku');



apiRouter.get('/haikus', (req, res) => {
    Haiku.find({}, (err, haikus) => {
        res.json(haikus);
    });
});


module.exports = apiRouter;
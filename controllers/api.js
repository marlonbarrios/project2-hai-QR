//a separate file to expose the routes tht just serve jsin data
const apiRouter = require('express').Router();
const Haiku = require('../models/haiku');



//index api route

apiRouter.get('/haikus', (req, res) => {
Haiku.find({}, (err, haikus) => {
    res.json(haikus);
});
});

// apiRouter.get('/haikus/author', (req, res) => {
// Haiku.find(req.params.author, (err, haiku) => {
//     res.json(haiku);
// })

// });




module.exports = apiRouter;


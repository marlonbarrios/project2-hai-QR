const express = require("express")
const haikuRouter = express.Router()
const Haiku = require('../models/haiku')
const seedData = require('../models/haikuSeed')


haikuRouter.get('/seed', async (req, res) => {
    await Haiku.deleteMany({});
    await Haiku.create(seedData);
    res.redirect('/haikus');
});

// Index
haikuRouter.get("/", (req, res) => {
    Haiku.find({}, (error, allHaikus) => {
      res.render("index.ejs", {
        haikus: allHaikus,
      })
    })
  })

 
 haikuRouter.get("/new", (req, res) => {
    res.render("new.ejs")
  })

// Delete
haikuRouter.delete("/:id", (req, res) => {
    Haiku.findByIdAndRemove(req.params.id, (err, haikus) => {
      res.redirect("/haikus");
    });
  
});

// Update

  haikuRouter.put("/:id", (req, res) => {
 Haiku.findByIdAndUpdate(req.params.id, req.body, (err, haiku) => {
    res.redirect(`/haikus/${req.params.id}`);
});

})



  
//   // Create Route
haikuRouter.post('/', (req, res) => {
// req.body.completed = !!req.body.completed; // !!'on' -> true or !!undefined -> false
Haiku.create(req.body, function (err, haiku) {
        res.redirect('/haikus'); // tells the browser to make another GET request to /books
    });
});


  // Show
haikuRouter.get("/:id", (req, res) => {
    Haiku.findById(req.params.id, (err, foundHaiku) => {
      res.render("show.ejs", {
        haiku: foundHaiku,
      })
    })
})

module.exports = haikuRouter
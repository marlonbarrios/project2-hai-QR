const {
  query
} = require("express")
const express = require("express")
const haikuRouter = express.Router()
const Haiku = require('../models/haiku')
const seedData = require('../models/haikuSeed')
const isAuthenticated = require('../utilities/auth')
const user = require('../controllers/users')


haikuRouter.get('/seed', async (req, res) => {
  await Haiku.deleteMany({});
  await Haiku.create(seedData);
  res.redirect('/haikus');
});

//search
haikuRouter.get("/search", isAuthenticated, (req, res) => {
  if (req.query.title) {
    Haiku.find({
      title: {
        $regex: req.query.title
      }
    }, (err, haikus) => {
      res.json(haikus)
    });
  } else {
    res.render('haikus/search.ejs')
  }

})

// Index
haikuRouter.get("/", isAuthenticated, (req, res) => {
  Haiku.find({}, (error, allHaikus) => {
    res.render("./haikus/index.ejs", {
      haikus: allHaikus,
    })
  })
})


//NNN
haikuRouter.get("/new", isAuthenticated, (req, res) => {
  res.render("./haikus/new.ejs")
})

// Delete
haikuRouter.delete("/:id", isAuthenticated, (req, res) => {
  Haiku.findByIdAndRemove(req.params.id, (err, haikus) => {
    res.redirect("/users/dashboard");
  });
});



haikuRouter.put('/:id', isAuthenticated, (req, res) => {


  Haiku.findByIdAndUpdate(req.params.id, req.body, (err, haiku) => {
    res.redirect(`/haikus/${req.params.id}`);
  });

});


haikuRouter.post('/', isAuthenticated, (req, res) => {
  req.body.createdBy = req.session.user;

  Haiku.create(req.body, function (err, haiku) {
    res.redirect("/users/dashboard");
  });
});


haikuRouter.get("/:_id/edit", isAuthenticated, (req, res) => {
  Haiku.findById(req.params._id, (err, foundHaiku) => {

    res.render("./haikus/edit.ejs", {
      haiku: foundHaiku,

    })
  })
})



haikuRouter.get("/:_id", isAuthenticated, (req, res) => {
  Haiku.findById(req.params._id, (err, foundHaiku) => {
    res.render("haikus/show.ejs", {
      haiku: foundHaiku,
    })
  })
})


module.exports = haikuRouter
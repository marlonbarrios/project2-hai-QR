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
      res.render("./haikus/index.ejs", {
        haikus: allHaikus,
      })
    })
  })


 //NNN
 haikuRouter.get("/new", (req, res) => {
    res.render("./haikus/new.ejs")
  })

// Delete
haikuRouter.delete("/:id", (req, res) => {
    Haiku.findByIdAndRemove(req.params.id, (err, haikus) => {
      res.redirect("/haikus");
    });
  
});

// Update

// haikuRouter.put("haikus/:_id", (req, res) => {
//     console.log('Update route has been accessed');
//    Haiku.findByIdAndUpdate(
//     haiku.author = req.body.author,
//     haiku.title = req.body.title,
//     haiku.file1 = req.body.file1,
//     haiku.file2 = req.body.file2,
//     haiku.file3 = req.body.file3,
// // {
//         new: true,
//       },
//       (error, updatedHaiku) => {
//         res.redirect(`haikus/${req.params._id}`)
//       }
//     )
//   })
    


 haikuRouter.put('/:id', (req, res) => {

     
      Haiku.findByIdAndUpdate(req.params.id, req.body, (err, haiku) => {
            res.redirect(`/haikus/${req.params.id}`);
        }); 
       
    }); 


//   // Create Route
haikuRouter.post('/', (req, res) => {
// req.body.completed = !!req.body.completed; // !!'on' -> true or !!undefined -> false
Haiku.create(req.body, function (err, haiku) {
        res.redirect('/haikus'); // tells the browser to make another GET request to /books
    });
});

////eeeee

haikuRouter.get("/:_id/edit", (req, res) => {
    Haiku.findById(req.params._id, (err, foundHaiku) => {
        
      res.render("./haikus/edit.ejs", {
        haiku: foundHaiku,
      
      })
    })
  })


  // Show
haikuRouter.get("/:_id", (req, res) => {
    Haiku.findById(req.params._id, (err, foundHaiku) => {
      res.render("haikus/show.ejs", {
        haiku: foundHaiku,
      })
    })
})

module.exports = haikuRouter


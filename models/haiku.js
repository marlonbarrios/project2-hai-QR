const mongoose = require('mongoose')

const Schema = mongoose.Schema;
//Set up shortcut varuable
const haikuSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  line1: { type: String, required: true },
  line2: { type: String, required: true },
  line3: { type: String, required: true },

//   completed:{type: Boolean, default: false },

}, {timestamps: true });

//compile the squema into a model
const Haiku = mongoose.model("Haiku", haikuSchema);

module.exports = Haiku


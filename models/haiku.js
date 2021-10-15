const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const haikuSchema = new Schema({
  title: { type: String, required: true, lowercase: true },
  author: { type: String, required: true, lowercase: true },
  line1: { type: String, required: true },
  line2: { type: String, required: true },
  line3: { type: String, required: true },

  createdBy: {

    type: Schema.Types.ObjectId,
    
    ref: 'User'
},




}, {timestamps: true });


const Haiku = mongoose.model("Haiku", haikuSchema);

module.exports = Haiku


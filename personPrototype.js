const mongoose = require("mongoose");
const validator = require("validator");
const personPrototypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    // unique: true,
    lowercase: true,
    sparse: true,
    // validate: (value) => {
    //   return validator.isName(value);
    // },
  },
  age: Number,
  favoriteFoods: [String],
});
const Person = mongoose.model("person", personPrototypeSchema);
module.exports = Person;

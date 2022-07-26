const express = require("express");
const mongoose = require("mongoose");
const Person = require("./personPrototype");
// const Database = require("./connectdb");
// Database();
// const { addPerson, arrayOfPeople } = require("./records");

const app = express();

// //environment variables

// require("dotenv").config();

// //database connection

// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("Connected Database Successfully");
// });

const db =
  "mongodb+srv://cha:4n4cO7ZXlxIdXLpS@cluster0.j41lbyo.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
// mongoose.connect(
//   "mongodb+srv://cha:<4n4cO7ZXlxIdXLpS>@cluster0.j41lbyo.mongodb.net/?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

app.use(express.json());
app.get("/", function (req, res) {
  res.send("ok");
});

// add new document into the collection with model.create()
const arrayOfPeople = async () => {
  try {
    const addPerson = await Person.create([
      {
        name: "selena",
        age: 30,
        favoriteFoods: ["salad", "fish"],
      },
      {
        name: "liz",
        age: 20,
        favoriteFoods: ["pizza", "pasta", "burritos"],
      },
      {
        name: "greta",
        age: 30,
        favoriteFoods: ["salad"],
      },
      { name: "john", age: 35, favoriteFoods: ["salad", "pasta"] },
      {
        name: "abraham",
        age: 32,
        favoriteFoods: ["Hamburger", "fish"],
      },
      {
        name: "alex",
        age: 28,
        favoriteFoods: ["salad", "burritos"],
      },
      {
        name: "ted",
        age: 35,
        favoriteFoods: ["pasta", "fries"],
      },
    ]);
    console.log(addPerson);
  } catch (error) {
    console.log(error);
  }
};
arrayOfPeople();
// Find all the people having a given name, using Model.find() -> [Person]
const findByName = async (personName) => {
  const people = await Person.find({ name: personName });
  console.log("searchByName", people);
};
findByName();
//Find just one person which has a certain food in the person's favorites
const findOnePerson = (food) => {
  Person.findOne({ favoriteFoods: food }, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
};
findOnePerson(["salad"]);
// Find the (only!!) person having a given _id
const findId = (personId) => {
  Person.findById({ _id: personId }, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
};
findId("62e0635b3a3c43265c0a9cad");
//Find, Edit, then Save
const findAndEdit = (personId, foodadded) => {
  Person.findById({ _id: personId }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      res.favoriteFoods.push(foodadded);
      res.save((error, newData) => {
        err ? ("couldn't save new data", error) : console.log(newData);
      });
      console.log(res);
    }
  });
};
findAndEdit("62e0635b3a3c43265c0a9cb0", "Hamburger");
//Perform New Updates on a Document
const findAndUpdate = (PersonName, ages) => {
  Person.findOneAndUpdate(
    { name: PersonName },
    { $set: { age: ages } },
    { new: true },
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );
};
findAndUpdate("greta", 20);
// Delete One Document
const findAndDelete = (personId) => {
  Person.findByIdAndRemove({ _id: personId }, { new: true }, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
};
findAndDelete("62e0635b3a3c43265c0a9cae");
// Delete Many Documents
const deleteManyDocuments = (personName) => {
  Person.remove({ name: personName }, (err, res) => {
    err ? console.log(err) : console.log(res);
  });
};
deleteManyDocuments("greta");
// Chain Search Query Helpers to Narrow Search Results
var queryChain = (searchFood) => {
  Person.find({ favoriteFoods: searchFood })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((error, res) => {
      error ? console.log(error) : console.log(res);
    });
};
queryChain("burritos");
const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const Person = require("../models/Person");

// add new document into the collection with model.create()

const arrayOfPeople = async () => {
  try {
    const addPerson = await Person.create([
      {
        name: "Selena",
        age: 30,
        favoriteFoods: ["salad", "fish"],
      },
      {
        name: "Liz",
        age: 20,
        favoriteFoods: ["pizza", "pasta"],
      },
      {
        name: "Greta",
        age: 30,
        favoriteFoods: ["salad"],
      },
      { name: "John", age: 35, favoriteFoods: ["salad", "pasta"] },
    ]);
    console.log(addPerson);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addPerson,
  arrayOfPeople,
};

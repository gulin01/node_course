require("../src/db/mongoose");

const User = require("../src/models/user");
// 63bbc3afdb395d9ce5a40aa3

// User.findByIdAndUpdate("63bbb4664eb1f9725c6006b5", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });

  const count = await User.countDocuments({ age });

  return count;
};

updateAgeAndCount("63bbb4664eb1f9725c6006b5", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => console.log(err));

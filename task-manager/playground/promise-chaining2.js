require("../src/db/mongoose");

const Task = require("../src/models/task");
// 63bbc3afdb395d9ce5a40aa3

// Task.findOneAndDelete("63bbc43955cd4f817ea72d83")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("63bbc2b2db395d9ce5a40a9c")
  .then((count) => console.log(count))
  .catch((err) => console.log(err));

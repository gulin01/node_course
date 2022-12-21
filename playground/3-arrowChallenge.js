const tasks = {
  tasks: [
    { text: "Grocery Shopping", completed: true },
    { text: "Cloth Shopping", completed: false },
    { text: "Clean kitchen", completed: true },
    { text: "Make up Shopping", completed: false },
  ],
  getTasks() {
    return this.tasks.filter((task) => task.completed === true);
  },
};

console.log(tasks.getTasks());

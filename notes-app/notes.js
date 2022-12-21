const fs = require("fs");
const chalk = require("chalk");

// Remove note
const removeNote = (title) => {
  console.log(title);
  const notes = loadNotes();
  const Notes = notes.filter((note) => note.title !== title);
  if (notes.length > Notes.length) {
    saveNotes(Notes);
    console.log(chalk.green.inverse("note is removed"));
  } else {
    console.log(chalk.red.inverse("no note is found"));
  }
};

// adds note

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse(" Note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();

  notes.forEach((element, i) => {
    if (i === 0) console.log(chalk.blue.inverse("Your notes"));
    console.log("title: ", element.title);
    console.log("content: ", element.body);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteIndex = notes.find((note) => note.title === title);
  if (noteIndex) {
    console.log(chalk.yellow.inverse(noteIndex.title));
    console.log(chalk.blue.inverse(noteIndex.body));
  } else {
    console.log(chalk.red.inverse("Note does not exist"));
  }
};
module.exports = {
  removeNote,
  addNote,
  listNotes,
  readNote,
};

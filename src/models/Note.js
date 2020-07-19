const fs = require("fs");
const chalk = require("chalk");

class Note {
  constructor() {}

  _load() {
    let notes = [];

    try {
      const rawData = fs.readFileSync("./data/notes.json");
      const jsonData = rawData.toString(); // Turns on a string (json format)
      const data = JSON.parse(jsonData);

      notes = data;
    } catch (e) {
      console.error(chalk.red("Something went wrong in the loading. ") + e);
    }

    return notes;
  }

  _verify(notes, title) {
    return notes.some((note) => note.title === title);
  }

  _save(notes, action = "saved") {
    try {
      const jsonData = JSON.stringify(notes);
      fs.writeFileSync("./data/notes.json", jsonData);
      console.log(chalk.green(`Note ${action} successfully`));
    } catch (e) {
      console.error(chalk.red("Something went wrong. ") + e);
    }
  }

  add(title, body) {
    const notes = this._load();

    if (this._verify(notes, title)) {
      console.error(
        chalk.red("There is already a note with this title. ") +
          "Try the " +
          chalk.bold("update") +
          " command"
      );

      return;
    }

    notes.push({
      title,
      body,
    });

    this._save(notes, "Note removed successfully");
  }

  remove(title) {
    const notes = this._load();

    if (!this._verify(notes, title)) {
      console.error(chalk.red("There is not a note with this title. "));

      return;
    }

    const remainNotes = notes.filter((note) => note.title !== title);

    this._save(remainNotes, "removed");
  }
}

module.exports = new Note();

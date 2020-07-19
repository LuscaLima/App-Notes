const fs = require("fs");
const chalk = require("chalk");

/** UTILS */
const { log, error } = console;

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
      error(chalk.red("Something went wrong in the loading. ") + e);
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
      log(chalk.green(`Note ${action} successfully`));
    } catch (e) {
      error(chalk.red("Something went wrong. ") + e);
    }
  }

  add(title, body) {
    const notes = this._load();

    if (this._verify(notes, title)) {
      error(
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

    this._save(notes, "removed");
  }

  update(title, body) {
    const notes = this._load();
    const updateNote = notes.find((note) => note.title === title);

    if (updateNote) {
      updateNote.body = body;
      this._save(notes, "updated");
    } else {
      error(
        chalk.red("There is already a note with this title. ") +
          "Try the " +
          chalk.bold("add") +
          " command"
      );
    }
  }

  remove(title) {
    const notes = this._load();
    const remainNotes = notes.filter((note) => note.title !== title);

    if (notes.length > remainNotes.length) {
      this._save(remainNotes, "removed");
    } else {
      error(chalk.red("There is not a note with this title."));
    }
  }

  read(title) {
    const notes = this._load();
    const readNote = notes.find((note) => note.title === title);

    if (readNote) {
      log(chalk.inverse(":: " + readNote.title + " ::"));
      log(readNote.body);
      log();
    } else {
      error(chalk.red("There is not a note with this title."));
    }
  }

  list() {
    const notes = this._load();

    log(chalk.bgBlue.white.bold("  YOUR NOTES  ") + "\n");

    notes.forEach((note) => {
      log(chalk.inverse(":: " + note.title + " ::"));
      log();
    });
  }
}

module.exports = new Note();

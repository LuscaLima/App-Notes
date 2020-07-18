const yargs = require("yargs");
const Note = require("../models/Note");

/** ADD command */
yargs.command(
  "add",
  "Add a new note",
  {
    title: {
      describe: "Note title",
      alias: "t",
      demandOption: true,
      type: "string",
    },

    body: {
      describe: "Note body",
      alias: "b",
      demandOption: true,
      description: "This is the content of your note",
      type: "string",
    },

    path: {
      describe: "Note path",
      alias: "p",
      description: "Define the directory where the note will be save",
      type: "string",
    },
  },
  (argv) => {
    Note.add(argv.title, argv.body, argv.path);
  }
);

/** REMOVE command */
yargs.command(
  "remove",
  "Remove a note",
  () => {},
  () => {
    console.log("Removing a note!");
  }
);

/** LIST command */
yargs.command(
  "list",
  "List all notes",
  () => {},
  () => {
    console.log("List all notes!");
  }
);

/** READ command */
yargs.command(
  "read",
  "Read a note",
  () => {},
  () => {
    console.log("Reading a note!");
  }
);

yargs.parse();

module.exports = yargs;

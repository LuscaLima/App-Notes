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
  },
  (argv) => {
    Note.add(argv.title, argv.body, argv.path, argv.ext);
  }
);

/** REMOVE command */
yargs.command(
  "remove",
  "Remove a note",
  {
    title: {
      describe: "Note title",
      alias: "t",
      demandOption: true,
      type: "string",
    },
  },
  (argv) => {
    Note.remove(argv.title);
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

const fs = require("fs");

class Note {
  constructor() {}

  _verify(title, path) {
    let isThere = true;

    try {
      fs.readFileSync(`${path}/${title}.json`);
    } catch (e) {
      isThere = false;
    }

    return isThere;
  }

  add(title, body, path = "./src/data") {
    if (this._verify(title, path)) {
      console.log("The file already exists and it will be overwritten");
    }

    try {
      fs.writeFileSync(`${path}/${title}.json`, body.toString().trim());
    } catch (e) {
      console.error("Something went wrong " + e);
    }
  }
}

module.exports = new Note();

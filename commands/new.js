const fs = require("fs-extra");
const path = require("path");

const PROJECT_TEMPLATE_PATH = path.resolve(__dirname, "..", "project-template");

module.exports = (projectName) => {
  console.log(projectName);
  fs.copy(PROJECT_TEMPLATE_PATH, "./" + projectName, (err) => {
    if (err) {
      console.log("An error occured while creating the project.");
      return console.error(err);
    }

    console.log("Project created!");
  });
};

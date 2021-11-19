const { writeFile, readdir } = require("fs/promises");
const path = require("path");
const { exit } = require("process");
const PROJECT_TEST_TEMPLATE_PATH = path.resolve(__dirname, "..");

const BASE_FILTER = "module.exports = {}";

module.exports = async (filter) => {
  const configPath = PROJECT_TEST_TEMPLATE_PATH + "/config-filters.json";
  const filterFolderPath = PROJECT_TEST_TEMPLATE_PATH + "/filters";
  const config = require(configPath);
  const filters = await readdir(filterFolderPath);

  if (filters.includes(filter + ".js")) {
    console.log("Filter déjà exsistant");
    console.log("Code: 54644");
    exit(0);
  }

  await writeFile(filterFolderPath + "/" + filter + ".js", BASE_FILTER);
};

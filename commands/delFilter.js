const { unlink } = require("fs/promises");
const path = require("path");
const { exit } = require("process");
const PROJECT_TEST_TEMPLATE_PATH = path.resolve(__dirname, "..");

module.exports = async (filter) => {
  const configPath = PROJECT_TEST_TEMPLATE_PATH + "/config-filters.json";
  const filterFolderPath = PROJECT_TEST_TEMPLATE_PATH + "/filters";
  const config = require(configPath);
  const stepsValues = Object.values(config.steps);

  if (stepsValues && stepsValues.find((s) => s.filter === filter)) {
    console.log("Filter utilisé dans la config");
    console.log("Code: 54698");
    exit(0);
  }

  await unlink(filterFolderPath + "/" + filter + ".js");
};

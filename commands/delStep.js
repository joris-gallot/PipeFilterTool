const { writeFile } = require("fs/promises");
const path = require("path");
const { exit } = require("process");
const PROJECT_TEST_TEMPLATE_PATH = path.resolve(__dirname, "..");

const BASE_FILTER = "module.exports = {}";

module.exports = async (stepId) => {
  const configPath = PROJECT_TEST_TEMPLATE_PATH + "/config-filters.json";
  const config = require(configPath);
  const stepsKeys = Object.keys(config.steps);

  if (stepsKeys && !stepsKeys.includes(stepId)) {
    console.log("Step " + stepId + " inexistant");
    console.log("Code: 54677");
    exit(0);
  }

  delete config.steps[stepId];

  await writeFile(configPath, JSON.stringify(config));
};

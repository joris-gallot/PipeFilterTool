const { writeFile } = require("fs/promises");
const path = require("path");
const { exit } = require("process");
const PROJECT_TEST_TEMPLATE_PATH = path.resolve(__dirname, "..");

module.exports = async (stepId, filterName, nextId) => {
  const configPath = PROJECT_TEST_TEMPLATE_PATH + "/config-filters.json";
  const config = require(configPath);
  const stepsKeys = Object.keys(config.steps);

  if (stepsKeys && stepsKeys.includes(stepId)) {
    console.log("Step " + stepId + " déjà présent");
    console.log("Code: 54678");
    exit(0);
  }

  if (stepsKeys && !stepsKeys.includes(nextId)) {
    console.log("Step " + nextId + " inexistant");
    console.log("Code: 54677");
    exit(0);
  }

  config.steps[stepId] = {
    filter: filterName,
    next: nextId,
  };

  await writeFile(configPath, JSON.stringify(config));
};

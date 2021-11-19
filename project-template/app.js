const { readdir } = require("fs/promises");
const path = require("path");
const { exit } = require("process");
const FILTERS_FOLDER_NAME = "filters";
const FILTERS_CONFIG_NAME = "config-filters.json";
const FILTERS_FOLDER = path.resolve(__dirname, FILTERS_FOLDER_NAME);

const start = async () => {
  await validFilters();
  validConfigFilters();
  executeFilters();
};

const executeFilters = async () => {
  const config = require(path.resolve(__dirname, FILTERS_CONFIG_NAME));
  const firstStepKey = Object.keys(config.steps)[0];
  await executeStep(config, firstStepKey);
};

const executeStep = async (config, key, params = []) => {
  const step = config.steps[key];
  const filterFunc = require(path.resolve(
    __dirname,
    FILTERS_FOLDER_NAME,
    step.filter + ".js"
  ));

  console.log("Execution du filter : " + step.filter);
  const p = params ?? [];
  step.params = p.concat(step.params);

  const res = await filterFunc(...step.params);

  if (step.next) {
    await executeStep(config, step.next, [res]);
  }
};

const validFilters = async () => {
  const filters = await readdir(FILTERS_FOLDER);

  for (const filter of filters) {
    try {
      const fn = require(FILTERS_FOLDER + "/" + filter);

      if (typeof fn !== "function") {
        console.log("Fichier " + filter + " : non valide");
        console.log("Doit retourner une fonction");
        console.log("Code: 344478");
        exit(0);
      }
    } catch (error) {
      console.log("Fichier " + filter + " : non valide");
      console.log("Code: 345678");
      exit(0);
    }
  }

  console.log("Liste des filters : " + filters);
};

const validConfigFilters = () => {
  const config = require(path.resolve(__dirname, FILTERS_CONFIG_NAME));

  if (config.steps) {
    for (const stepKey of Object.keys(config.steps)) {
      const step = config.steps[stepKey];
      checkFilter(step.filter, stepKey);
      checkParams(step.params);
      checkNext(step.next, Object.keys(config.steps));
    }
  } else {
    console.log("Le fichier de config doit contenir des steps");
    console.log("Code: 345765");
    exit(0);
  }
};

const checkNext = (next, steps) => {
  if (next && !steps.includes(next)) {
    console.log("L'attribut 'next' doit faire référence a un step");
    console.log("Code: 345745");
    exit(0);
  }
};

const checkParams = (array) => {
  if (array && !Array.isArray(array)) {
    console.log("L'attribut 'params' doit être de type 'array'");
    console.log("Code: 345905");
    exit(0);
  }
};

const checkFilter = (filter, stepKey) => {
  if (!filter) {
    console.log("Le step '" + stepKey + "' doit contenir un attribut 'filter'");
    console.log("Code: 230005");
    exit(0);
  } else {
    try {
      require(path.resolve(__dirname, FILTERS_FOLDER_NAME, filter + ".js"));
    } catch (error) {
      console.log(
        "Le filter '" + filter + "' doit être présent dans le dossier 'filters'"
      );
      console.log("Code: 235905");
      exit(0);
    }
  }
};

start();

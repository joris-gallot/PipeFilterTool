#! /usr/bin/env node
const { program } = require("commander");
const newCommand = require("./commands/new");
const addFilterCommand = require("./commands/addFilter");
const delFilterCommand = require("./commands/delFilter");
const addStepCommand = require("./commands/addStep");
const delStepCommand = require("./commands/delStep");

program
  .command("new <project-name>")
  .description(
    "Créé l'arborescence projet avec un fichier de configuration vierge, et éventuellement un template de filter de type hello world."
  )
  .action(newCommand);

program
  .command("add_filter <filter>")
  .description("Créé un nouveau filter dans un projet existant")
  .action(addFilterCommand);

program
  .command("del_filter <filter>")
  .description("Supprimer un filter existant.")
  .action(delFilterCommand);

program
  .command("add_step <step-id> <filter-name> [next-id]")
  .description("Ajoute une step au fichier de configuration.")
  .action(addStepCommand);

program
  .command("del_step <step-id>")
  .description("Supprime une step du fichier de configuration.")
  .action(delStepCommand);

program.parse();

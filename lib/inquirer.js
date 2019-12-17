const inquirer = require("inquirer");

module.exports = {
  addToList: async () => {
    const questions = [
      {
        name: "item",
        type: "input",
        message: "What's the grocery item to add to the list:",
        validate: function(answer) {
          if (answer.length) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "department",
        type: "input",
        message: "What's the department for this item?:",
        default: "misc",
        validate: function(answer) {
          if (answer.length) {
            return true;
          } else {
            return department.default;
          }
        }
      },
      {
        name: "continue",
        type: "list",
        message: "Do you want to add more items?",
        default: "y",
        choices: [
          {
            key: "y",
            name: "yes",
            value: true
          },
          {
            key: "n",
            name: "no",
            value: false
          }
        ],
        validate: function(answer) {
          return true;
        }
      }
    ];
    return await inquirer.prompt(questions);
  },
  nextSteps: async () => {
    const next = [
      {
        name: "next",
        type: "list",
        message: "What would you like to do next:",
        choices: [
          {
            key: "s",
            name: "Show the grocery list by department",
            value: "s"
          },
          {
            key: "a",
            name: "Show the grocery list alphabetically by item names",
            value: "a"
          },
          {
            key: "w",
            name: "Write the list to a file, (always by department)",
            value: "w"
          },
          {
            key: "q",
            name: "End the program.",
            value: "q"
          },
          {
            key: "c",
            name: "Add more items to the list.",
            value: "c"
          }
        ],
        validate: function(answer) {
          return true;
        }
      }
    ];
    return await inquirer.prompt(next);
  }
};

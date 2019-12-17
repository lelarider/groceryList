const chalk = require("chalk");
const fs = require("fs");

const gList = require("./lib/inquirer");
const helpers = require("./lib/helpers");

module.exports = {
  runNext: async groceries => {
    let nextStep = await gList.nextSteps();
    let next = nextStep.next;
    if (next == "q") {
      console.log(chalk.red("Ok, bye!"));
      process.exit();
    } else if (next == "s") {
      // sort items by dept
      let sortedGroceries = groceries.sort((a, b) =>
        a.department > b.department ? 1 : -1
      );
      sortedGroceries.forEach(element => {
        console.log(
          `${helpers.titleCase(element.department)}: ${helpers.titleCase(
            element.item
          )}`
        );
      });
      runNext(groceries);
    } else if (next == "a") {
      // sort items by alphabetically
      let sortedGroceries = groceries.sort((a, b) =>
        a.item > b.item ? 1 : -1
      );
      sortedGroceries.forEach(element => {
        console.log(`${helpers.titleCase(element.item)}`);
      });
      runNext(groceries);
    } else if (next == "w") {
      // write list to text file
      let sortedGroceries = groceries.sort((a, b) =>
        a.department > b.department ? 1 : -1
      );
      const writeStream = fs.createWriteStream("grocery_list.txt");
      // write each value of the array on the file breaking line
      sortedGroceries.forEach(value =>
        writeStream.write(
          `${helpers.titleCase(value.department)}: ${helpers.titleCase(
            value.item
          )}\n`
        )
      );
      // the finish event is emitted when all data has been flushed from the stream
      writeStream.on("finish", () => {
        console.log(`wrote all the array data to file ${writeStream.path}`);
      });
      // handle the errors on the write process
      writeStream.on("error", err => {
        console.error(
          `There is an error writing the file ${writeStream.path} => ${err}`
        );
      });
      writeStream.end();
      runNext(groceries);
    } else if (next == "c") {
      run(groceries);
    }
  },
  run: async (groceryList = []) => {
    let keepAsking = true;
    while (keepAsking) {
      let itemResult = await gList.addToList();
      itemObject = {
        item: itemResult.item,
        department: itemResult.department
      };
      groceryList.push(itemObject);
      keepAsking = itemResult.continue;
    }
    runNext(groceryList);
  }
};

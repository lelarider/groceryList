const fs = require("fs");

module.exports = {
  titleCase: str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  quit: () => {
    console.log(chalk.red("Ok, bye!"));
    process.exit();
  },
  departmentSort: groceries => {
    // sort items by dept
    return groceries.sort((a, b) => (a.department > b.department ? 1 : -1));
  },
  alphabetSort: groceries => {
    // sort items by alphabetically
    return groceries.sort((a, b) => (a.item > b.item ? 1 : -1));
  },
  write: groceries => {
    // write list to text file
    let sortedGroceries = module.exports.departmentSort(groceries);
    console.log(sortedGroceries);
    const writeStream = fs.createWriteStream("./grocery_list.txt");
    // write each value of the array on the file breaking line
    sortedGroceries.forEach(value =>
      writeStream.write(
        `${module.exports.titleCase(
          value.department
        )}: ${module.exports.titleCase(value.item)}\n`
      )
    );
    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on("finish", () => {
      return true;
      console.log(`wrote all the array data to file ${writeStream.path}`);
    });
    // handle the errors on the write process
    writeStream.on("error", err => {
      return false;
      console.error(
        `There is an error writing the file ${writeStream.path} => ${err}`
      );
    });
    writeStream.end();
  }
};

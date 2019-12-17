const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const groceriesFuncs = require("./lib/helpers");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let groceryList = [];
app
  .route("/")
  .get((req, res) => {
    res.render("index", {
      item: null,
      gList: groceryList
    });
  })
  .post((req, res, next) => {
    console.log(groceryList);
    if (req.body.item) {
      groceryItem = { item: req.body.item };
      let department = req.body.department;
      if (department) {
        groceryItem["department"] = department;
      }
      console.log(groceryItem);
      groceryList.push(groceryItem);
      res.render("index", {
        item: `Adding ${req.body.item} to the list`,
        gList: groceryList
      });
    }
    if (req.body.complete) {
      res.redirect("/nextSteps");
    }
    // if (!req.body.item && !req.body.complete) {
    //     res.render("nextSteps");
    //   }
  });

app
  .route("/nextSteps")
  .get((req, res) => {
    res.render("nextSteps");
  })
  .post((req, res) => {
    console.log(groceryList);
    if (req.body.departent) {
      gList = groceriesFuncs.departmentSort(groceryList);
      res.render("nextStepsReturn", { gList: gList });
    } else if (req.body.alphabetically) {
      gList = groceriesFuncs.alphabetSort(groceryList);
      console.log(gList);
      res.render("nextStepsReturn", { gList: gList });
    } else if (req.body.write) {
      writeToFile = groceriesFuncs.write(groceryList);
      if (writeToFile == true) {
        res.send("Grocery list saved to text file :tada:");
      }
    } else if (req.body.quit) {
      res.redirect("/goodBye");
    } else if (req.body.more) {
      res.redirect("/");
    }
  });

app.get("/goodBye", (req, res) => {
  res.render("quitProgram");
});

app.listen(8000, () => {
  console.log("Listening on port 3000");
});

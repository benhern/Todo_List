import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Holding the lists 
var data = {
  workList: [],
  dayList: [],
};

let tab = "day";

//Used for the req to encode it in JSON to access like an object object.something.thing....
app.use(bodyParser.urlencoded({ extended: true }));

//This is for referencing local files through the server.
app.use(express.static("public"));

//Home route
app.get("/", (req, res) => {

  res.render("index.ejs", data);
});

//Route when task is entered
app.post("/submit", (req, res) => {
  let task = req.body.userTask;
  console.log(`Tab is on: ${tab}`);

  //Checking which tab we are on then adding to correct list 
  if (tab === "day") {
    data.dayList.push(task);
  } else if(tab === "work"){
    data.workList.push(task);
  }

  // console.log(`Daylist: ${data.dayList}`);
  // console.log(`WorkList: ${data.workList}`);
  // console.log(`TabClicked is: ${data.tabClicked}`);

  //Sending updated values
  res.render("index.ejs", data);
});


//route that sets the tab variable 0 for day 1 for work 
app.post("/tabs", (req, res) => {
  //Looking at the name attr in the html tag
  tab = req.body.Tab;
  console.log(tab);

  //204 means no content response
  res.status(204).send();
});

//Checking server is up
app.listen(port, () => {
  console.log("Server is up and running!! :D");
});

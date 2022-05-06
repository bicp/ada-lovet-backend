const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = 4001;

let events = [];
let lastId = 0;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/events", (req, res) => {
  res.send(events);
  res.end();
});

app.post("/events", (req, res) => {
  let content = req.body;
  lastId += 1;
  Object.assign(content, { id: lastId });
  events.push(content);
  res.send(content);
  res.end();
});

app.put("/events/:id", (req, res) => {
  let id = parseInt(req.params["id"]);
  let index = events.map((e) => e.id).indexOf(id);
  // [1,2,3,4] => 0
  events[index] = Object.assign({}, { id: id }, req.body);
  res.send(events);
  res.end();
});

app.delete("/events/:id", (req, res) => {
  let id = parseInt(req.params["id"]);
  events = events.filter((e) => e.id !== id);
  res.send(events);
  res.end();
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// get R
// post C
// put U
// delete D

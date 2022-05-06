const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const port = 4001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/events", (req, res) => {
  res.send([
    {
      id: 1,
      title: "title 1",
      content: "content 1",
      date: "2022-05-14T20:26",
      location: "location 1",
    },
  ]);
  res.end();
});

app.get("/login", (req, res) => {
  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// get R
// post C
// put U
// delete D

// eventos

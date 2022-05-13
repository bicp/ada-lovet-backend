const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { Event } = require("./models/event");
const { User } = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = 4001;

let events = [];
let lastId = 0;

// app.get("/", (req, res) => {
// //   res.send("Hello World!");
// });

app.get("/events", async (req, res) => {
  const events = await Event.find({ userId: req.query.id });

  console.log("EVENTS", events);
  res.send(events);
  res.end();
});

app.post("/events", async (req, res) => {
  let content = req.body;
  console.log(content);
  //   lastId += 1;
  //   Object.assign(content, { id: lastId });
  //   events.push(content);

  const result = await Event.create(content);

  res.send(result);
  res.end();
});

app.put("/events/:id", async (req, res) => {
  console.log(req.body);
  await Event.updateOne({ _id: req.params.id }, req.body);
  const event = await Event.findOne({ _id: req.params.id });

  res.send(event);
  res.end();
});

app.delete("/events/:id", async (req, res) => {
  //   let id = parseInt(req.params["id"]);
  //   events = events.filter((e) => e.id !== id);

  await Event.deleteOne({ _id: req.params.id });

  res.status(200).send({});
  res.end();
});

app.post("/login", async (req, res) => {
  const result = await User.findOne({
    email: req.body.username,
  });
  console.log(result);
  if (result) {
    if (req.body.password === result.password) {
      res.send({ email: result.email, id: result._id });
    } else {
      res.status(401).send({ message: "Incorrect password!" });
    }
  } else {
    res.status(401).send({ message: "User not found!" });
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  console.log(req.body.username, req.body.password);

  const result = await User.create({
    email: req.body.username,
    password: req.body.password,
  });

  res.send({ email: result.email, id: result._id });
});

async function start() {
  try {
    // const new_url =
    //   "mongodb+srv://ada:adalovet@cluster0.q2nkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    await mongoose.connect("mongodb://localhost:27017/ada-lovet");
    console.log("HELOOOOOOOOO!!!!!");
    // await mongoose.connect(new_url);
  } catch (e) {
    console.error("Cannot connect to DB!");
  }

  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

start();

// get R
// post C
// put U
// delete D

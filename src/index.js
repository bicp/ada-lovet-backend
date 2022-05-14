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

app.get("/events", async (req, res) => {
  const events = await Event.find(req.query.id ? { userId: req.query.id } : {});

  console.log("EVENTS", events);
  res.send(events);
  res.end();
});

app.post("/events", async (req, res) => {
  let content = req.body;
  console.log(content);

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
  await Event.deleteOne({ _id: req.params.id });

  res.status(200).send({});
  res.end();
});

app.post("/login", async (req, res) => {
  const result = await User.findOne({
    email: req.body.username,
  });

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
  const result = await User.create({
    email: req.body.username,
    password: req.body.password,
  });

  res.send({ email: result.email, id: result._id });
});

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (e) {
    console.error("Cannot connect to DB!");
  }

  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

start();

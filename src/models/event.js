const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = {
  Event,
};

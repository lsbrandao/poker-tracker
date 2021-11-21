const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayingGroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  playerNames: {
    type: [String],
    required: true,
  },
  months: [],
});

module.exports = mongoose.model("PlayingGroup", PlayingGroupSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayingGroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  playerNames: {
    type: [String],
    required: true,
  },
  playedMonths: [
    {
      name: String,
      isMonthClosed: { type: Boolean, required: true },
      sessions: {
        type: [
          {
            name: String,
            date: String,
            totalDollarsAmount: Number,
            playersResults: [
              {
                playerName: {
                  type: String,
                  required: true,
                },
                buyins: {
                  type: Number,
                  required: true,
                },
                rebuys: {
                  type: Number,
                  required: true,
                },
                totalChips: {
                  type: Number,
                  required: true,
                },
                result: {
                  type: Number,
                  required: true,
                },
              },
            ],
          },
        ],
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("PlayingGroup", PlayingGroupSchema);

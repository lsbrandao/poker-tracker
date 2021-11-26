const express = require("express");
const PlayingGroup = require("../models/playing-group");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const { buyinPrice } = require("../appConfig");

/* PUT new player result. */
router.put(
  "/",
  catchAsync(async function (req, res, next) {
    /* 
    Expected request body: 
    groupId: String
    monthId: String
   sessionId: String
   playerId: String
   buyins: Number
   rebuys: Number
   totalChips: Number
    */

    //To do: move to a const file

    const playingGroup = await PlayingGroup.findById(req.body.groupId);
    const month = playingGroup.playedMonths.find(
      (month) => month._id.toString() === req.body.monthId
    );
    const session = month.sessions.find(
      (session) => session._id.toString() === req.body.sessionId
    );

    // find player by id and replace property values
    session.playersResults.some((player) => {
      if (player._id.toString() === req.body.playerId) {
        player.buyins = req.body.buyins;
        player.rebuys = req.body.rebuys;
        player.totalChips = req.body.totalChips;
        player.result =
          player.totalChips -
          player.buyins * buyinPrice -
          player.rebuys * buyinPrice;
      }
      return player._id.toString() === req.body.playerId;
    });

    await playingGroup.save();
    res.send("done");
  })
);

module.exports = router;

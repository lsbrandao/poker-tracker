const express = require("express");
const PlayingGroup = require("../models/playing-group");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

/* POST new game session. */
router.post(
  "/",
  catchAsync(async function (req, res, next) {
    /* Expected request body: 
    groupId: String
    monthId: String
    sessionName: String
    date: String
    playersResult: []
    */

    const playingGroup = await PlayingGroup.findById(req.body.groupId);
    const month = playingGroup.playedMonths.find(
      (month) => month._id.toString() === req.body.monthId
    );
    //  push new session
    month.sessions.push({
      name: req.body.sessionName,
      date: req.body.date,
      playerResults: [],
    });
    await playingGroup.save();
    res.send("done");
  })
);

module.exports = router;

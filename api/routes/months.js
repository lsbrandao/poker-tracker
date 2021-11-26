const express = require("express");
const PlayingGroup = require("../models/playing-group");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

/* POST new month. */
router.post(
  "/",
  catchAsync(async function (req, res, next) {
    /* 
    Expected request body: 
    groupId: String
    monthName: String
    */

    const playingGroup = await PlayingGroup.findById(req.body.groupId);

    playingGroup.playedMonths.push({
      name: req.body.monthName,
      isMonthClosed: false,
      sessions: [],
    });

    await playingGroup.save();
    res.send("done");
  })
);

/* POST close month. */
router.post(
  "/",
  catchAsync(async function (req, res, next) {
    /* 
    Expected request body: 
    groupId: String
    monthId: String
    isMonthClosed: boolean
    */

    const playingGroup = await PlayingGroup.findById(req.body.groupId);
    const month = playingGroup.playedMonths.find(
      (month) => month._id.toString() === req.body.monthId
    );
    month.isMonthClosed = req.body.isMonthClosed;

    await playingGroup.save();
    res.send("done");
  })
);

module.exports = router;

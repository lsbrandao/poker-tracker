const express = require("express");
const PlayingGroup = require("../models/playing-group");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { playingGroupSchema } = require("../schemas");
const router = express.Router();

const validatePlayingGroup = (req, res, next) => {
  const { error } = playingGroupSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get(
  "/",
  catchAsync(async (req, res) => {
    const playingGroups = await PlayingGroup.find({});
    res.send(playingGroups);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const playingGroup = await PlayingGroup.findById(req.params.id);
    if (!playingGroup) {
      throw new AppError("Group not found", 404);
    }
    res.send(playingGroup);
  })
);

router.post(
  "/",
  validatePlayingGroup,
  catchAsync(async (req, res) => {
    const newPlayingGroup = new PlayingGroup(req.body);
    await newPlayingGroup.save();
    res.send(newPlayingGroup);
  })
);

router.put(
  "/:id",
  validatePlayingGroup,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await PlayingGroup.findByIdAndUpdate(id, { ...req.body });
    res.send(req.body);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await PlayingGroup.findByIdAndDelete(id);
    res.send("SUCCESS");
    res.status(500).send(e);
  })
);

// router.get("/makeGroup", (req, res) => {
//   const group1 = new PlayingGroup({
//     name: "Group 1",
//     playerNames: ["Player 1", "Player 2"],
//     months: [],
//   });
//   const group2 = new PlayingGroup({
//     name: "Group 2",
//     playerNames: ["Player 3", "Player 4"],
//     months: [],
//   });
//   group1.save();
//   group2.save();
//   // res.send(group);
// });
module.exports = router;

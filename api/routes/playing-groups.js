const express = require("express");
const PlayingGroup = require("../models/playing-group");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn } = require("../utils/isLoggedIn");
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

// GET Playing groups
router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const playingGroups = await PlayingGroup.find({});
    res.send(playingGroups);
  })
);

// GET specific group
router.get(
  "/deatils/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const playingGroup = await PlayingGroup.findById(req.params.id);
    if (!playingGroup) {
      throw new ExpressError("Group not found", 404);
    }
    res.send(playingGroup);
  })
);

// POST create new group
router.post(
  "/",
  isLoggedIn,
  validatePlayingGroup,
  catchAsync(async (req, res) => {
    const newPlayingGroup = new PlayingGroup(req.body);
    await newPlayingGroup.save();
    res.send(newPlayingGroup);
  })
);

// PUT update group
router.put(
  "/:id",
  isLoggedIn,
  validatePlayingGroup,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await PlayingGroup.findByIdAndUpdate(id, { ...req.body });
    res.send(req.body);
  })
);

// DELETE group
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await PlayingGroup.findByIdAndDelete(id);
    res.send("SUCCESS");
  })
);

// TO DO: Remove
router.get(
  "/makeGroup",
  catchAsync(async (req, res) => {
    const group1 = new PlayingGroup({
      name: "Group 1",
      playerNames: ["Player 1", "Player 2", "Player 3"],
      playedMonths: [
        {
          name: "November",
          isMonthClosed: true,
          sessions: [
            {
              name: "Session 1",
              date: "04-11-2021",
              totalDolarsAmount: 120,
              playersResults: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
              ],
            },
            {
              name: "Session 2",
              date: "11-11-2021",
              totalDolarsAmount: 50,
              playersResults: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
                {
                  playerName: "Player 2",
                  buyins: 1,
                  rebuys: 2,
                  totalChips: 60,
                  result: 30,
                },
              ],
            },
          ],
        },
        {
          name: "October",
          isMonthClosed: true,
          sessions: [],
        },
      ],
    });
    const group2 = new PlayingGroup({
      name: "Group 2",
      playerNames: ["Player 4", "Player 5", "Player 6"],
      playedMonths: [
        {
          name: "November",
          isMonthClosed: true,
          sessions: [
            {
              name: "Session 1",
              date: "04-11-2021",
              totalDolarsAmount: 120,
              playersResults: [
                {
                  playerName: "Player 1",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
              ],
            },
            {
              name: "Session 2",
              date: "11-11-2021",
              totalDolarsAmount: 180,
              playersResults: [
                {
                  playerName: "Player 3",
                  buyins: 1,
                  rebuys: 1,
                  totalChips: 30,
                  result: 10,
                },
                {
                  playerName: "Player 4",
                  buyins: 1,
                  rebuys: 2,
                  totalChips: 60,
                  result: 30,
                },
              ],
            },
          ],
        },
        {
          id: "202110",
          name: "October",
          isMonthClosed: true,
          sessions: [],
        },
      ],
    });
    const test = await group1.save();
    console.log(test);
    group2.save();
    res.send(group1);
  })
);
module.exports = router;

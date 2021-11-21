const Joi = require("joi");

const playingGroupSchema = Joi.object({
  name: Joi.string().required(),
  playerNames: Joi.array().required(),
  months: Joi.array().required(),
}).required();

module.exports.playingGroupSchema = playingGroupSchema;

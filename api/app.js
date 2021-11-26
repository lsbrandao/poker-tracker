const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const playingGroupsRouter = require("./routes/playing-groups");
const sessionsRouter = require("./routes/sessions");
const playersRouter = require("./routes/players");
const monthsRouter = require("./routes/months");

mongoose.connect("mongodb://localhost:27017/poker-tracker");
mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/groups", playingGroupsRouter);
app.use("/sessions", sessionsRouter);
app.use("/players", playersRouter);
app.use("/months", monthsRouter);

// const handleCastError = (err) => {
//   return new ExpressError(`Operation failed, ${err.message}`, 400);
// };

// app.use((err, req, res, next) => {
//   if (err.name === "CastError") err = handleCastError(err);
//   next(err);
// });

app.use((err, req, res, next) => {
  const { message = "Something went wrong.", statusCode = 500 } = err;
  res.status(statusCode).send(message);
});

app.listen(3000, () => {
  console.log("serving on port 3000");
});

module.exports = app;

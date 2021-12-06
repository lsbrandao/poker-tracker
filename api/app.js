const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

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
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  // cookie: {
  // maxAge: 1000 * 60 * 60 * 24 * 7,
  // },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  res.status(statusCode).send({ error: message });
});

app.listen(3000, () => {
  console.log("serving on port 3000");
});

module.exports = app;

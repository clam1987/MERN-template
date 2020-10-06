const express = require("express"),
      app = express(),
      session = require("express-sessions"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      jwt = require("jsonwebtoken"),
      apiRoutes = require("./routes");
      PORT = process.env.PORT || 3001;
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// app.set('trust proxy', 1)
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

app.use(apiRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myproject", { useNewUrlParser: true });

app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));

const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      passport = require("passport"),
      apiRoutes = require("./routes"),
      PORT = process.env.PORT || 3001;
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.use(apiRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myproject", { useNewUrlParser: true });

app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));

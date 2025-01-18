const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const User = require("./models/user");
const Chore = require("./models/chore");
const Tag = require("./models/tag");

const app = express();

const authRoutes = require("./routes/auth");
const choreRoutes = require("./routes/chores");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// handle cors
app.use((req, res, next) => {
  // can allow all with * or specific domains and if have multiple domains can
  // separate them via ','
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// TODO remove eventually as this is just for testing with user in session
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/auth", authRoutes);
app.use("/chores", choreRoutes);

User.hasMany(Chore);
Chore.belongsTo(User);
Chore.hasMany(Tag);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        username: "zleaman",
        email: "zleaman3@gmail.com",
        password: "",
      });
    }
    return user;
  })
  .then(() => {
    app.listen(3000);
    console.log("STARTED SUCCESSFULLY");
  })
  .catch((error) => console.log(error));

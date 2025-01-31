const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const sequelize = require("./util/database");
// const User = require("./models/user");
// const Chore = require("./models/chore");
// const Tag = require("./models/tag");

require("dotenv").config();

const supabase = require("./db/supabaseClient");

const app = express();

const authRoutes = require("./routes/auth");
const choreRoutes = require("./routes/chores");
const achievementRoutes = require("./routes/achievement");
const userProfileRoutes = require("./routes/user-profile");

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

app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    req.user = user;
    req.token = token;
  }

  next();
});

app.use("/auth", authRoutes);
app.use("/chores", choreRoutes);
app.use("/achievement", achievementRoutes);
app.use("/user-profile", userProfileRoutes);

app.listen(3000);
console.log("STARTED SUCCESSFULLY");

// User.hasMany(Chore);
// Chore.belongsTo(User);
// Chore.hasMany(Tag);

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         username: "zleaman",
//         email: "zleaman3@gmail.com",
//         password: "password",
//       });
//     }
//     return user;
//   })
//   .then(() => {
//     app.listen(3000);
//     console.log("STARTED SUCCESSFULLY");
//   })
//   .catch((error) => console.log(error));

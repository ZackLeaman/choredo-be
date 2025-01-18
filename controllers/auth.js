const User = require("../models/user");

exports.postUser = (req, res, next) => {
  console.log("POST USER", req.body);

  if (!req.body.email && !req.body.password) {
    return res.status(422).json({ error: "Invalid body parameters" });
  }

  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  }).then((user) => {
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    console.log(user);
    const { id, username, email } = user.dataValues;
    return res.status(200).json({ id, username, email });
  });
};

exports.putUser = (req, res, next) => {
  console.log("PUT USER", req.body);

  res.status(200).json({
    id: 0,
    username: req.body.username,
    email: req.body.email,
  });
};

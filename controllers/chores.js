const Chore = require("../models/chore");
const Tag = require("../models/tag");

exports.getChores = (req, res, next) => {
  console.log("GET CHORES");

  // make sure someone is auth/session before returning app chores
  if (req.user) {
    Chore.findAll()
      .then((chores) => {
        return res.status(200).json({
          data: [...chores],
        });
      })
      .catch((e) => console.log(e));
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

exports.getUserChores = async (req, res, next) => {
  console.log(`GET USER CHORES`, req.params, req.user.id);

  if (req.user && req.user.id === +req.params.userId) {
    const chores = await req.user.getChores();

    const choresMap = await Promise.all(
      chores.map(async (chore) => {
        const tags = await Tag.findAll({ where: { choreId: chore.id } });
        return {
          ...chore.dataValues,
          tags: [...tags.map((tag) => tag.dataValues.id)],
        };
      })
    );

    console.log(choresMap);
    return res.status(200).json({
      data: [...choresMap],
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

exports.postChore = (req, res, next) => {
  console.log("POST CHORE", req.body);

  const name = req.body.name;
  const frequencyDays = req.body.frequencyDays;
  const completedOn = req.body.completedOn;
  const description = req.body.description;
  const tags = req.body.tags;
  let chore;

  if (req.user) {
    req.user
      .createChore({
        name,
        frequencyDays,
        completedOn,
        description,
      })
      .then((result) => {
        chore = result.dataValues;

        tags.forEach((tag) => {
          const id = tag.toLowerCase();

          Tag.create({
            id,
            choreId: chore.id,
          });
        });
      })
      .then((result) => {
        console.log(result);
        return res.status(200).json({
          data: { ...result },
          status: "chore posted successfully",
        });
      })
      .catch((e) => console.log(e));
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

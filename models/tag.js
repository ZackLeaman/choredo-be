const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Tag = sequelize.define(
  "tag",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    choreId: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Tag;

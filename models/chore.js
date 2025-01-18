const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Chore = sequelize.define(
  "chore",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    frequencyDays: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    completedOn: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    //   user_id: {
    //     type: Sequelize.INTEGER.UNSIGNED,
    //     allowNull: false,
    //     unique: true,
    //   }
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Chore;

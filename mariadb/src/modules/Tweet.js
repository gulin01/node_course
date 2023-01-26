const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Tweet", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncerement: true,
    primaryKey: true,
  },
  content: Sequelize.STRING(300),
});

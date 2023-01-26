const { globalAgent } = require("http");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "gulin", "password", {
  host: "127.0.0.1",
  dialect: "mariadb",
  dialectOptions: {
    connectTimeout: 1000,
  },
});

module.exports = sequelize;
global.sequelize = sequelize;

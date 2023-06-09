const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("NLP", "root", "S3cret", {
    host: "34.87.49.23",
    dialect: "mysql",
  });

module.exports = {sequelize}
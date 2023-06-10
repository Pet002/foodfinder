const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("NLP", "root", "S3cret", {
    host: "34.87.29.214",
    dialect: "mysql",
  });

module.exports = {sequelize}
const { Sequelize, DataTypes } = require("sequelize");
// const dotenv = req
require('dotenv').config();
// console.log(process.env.DB_USERNAME)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: "5432",
    dialect: "postgres",
  });

module.exports = {sequelize}
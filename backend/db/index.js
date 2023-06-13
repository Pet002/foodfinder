const { sequelize } = require("./models/sequelize.init");
const Store = require("./models/store.model");
const Rating = require("./models/rating.model");
require('dotenv').config();
const Connection = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database: ", err);
    });
};

const SyncDatabase = async () => {
  // Create Relation of database
  Store.hasMany(Rating, {
    foreignKey: { name: "store_id", field: "store_id" },
  });

  // Migration to the database
  await sequelize
    .sync()
    .then(() => {
      console.log("table created successfully!");
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

Connection();
SyncDatabase();

module.exports = { Connection, SyncDatabase };

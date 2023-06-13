const { Sequelize, DataTypes, Model, UUID } = require("sequelize");
const { sequelize } = require("./sequelize.init");
const Store = require("./store.model");

class Rating extends Model {}

Rating.init({
  rating_id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  point:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  review:{
    type:DataTypes.STRING,
  }
},
{
  sequelize,
  modelName: "ratings"
})


module.exports = Rating;
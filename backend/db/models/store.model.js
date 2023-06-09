const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("./sequelize.init");

class Store extends Model {}

Store.init({
    store_id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    store_name:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    lat:{
        type:DataTypes.DOUBLE,
    },
    long:{
        type:DataTypes.DOUBLE,
    }
  },
  {
    sequelize,
    modelName: "stores"
  })


module.exports = Store;
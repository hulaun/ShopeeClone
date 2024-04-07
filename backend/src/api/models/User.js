const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mssql://sa:12345@localhost:1433/ShopeeClone");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    googleID: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    facebookID: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.sync` will create the table if it doesn't exist
User.sync().then(() => {
  console.log("User table created.");
});

module.exports = User;

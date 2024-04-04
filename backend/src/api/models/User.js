const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mssql://sa:12345@localhost:1433/ShopeeClone");

const User = sequelize.define(
  "User",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    GoogleID: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    FacebookID: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ProfilePicture: {
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

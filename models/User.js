const { Model, DataTypes } = require('sequelize'); // Import the Model and DataTypes modules from Sequelize
const bcrypt = require('bcrypt'); // Import the bcrypt module for password hashing
const sequelize = require('../config/connection'); // Import the Sequelize instance for database connection

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); // Compare the provided login password with the hashed password stored in the model instance
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    }, // Define the 'password' attribute as a non-nullable string with length validation
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the user's password before creating a new user
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // Hash the user's password before updating the user
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User; // Export the User model for use in other parts of the application

"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toSafeObject = function () {
      // remember, this cannot be an arrow function
      const { id, username, email, firstName, lastName, profilePicture, bio } =
        this; // context will be the User instance
      return { id, username, email, firstName, lastName, profilePicture, bio };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedpassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }


    static async signup({ username, email, password, bio, profilePicture, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      console.log(email)
      const user = await User.create({
        username,
        email,
        hashedpassword: hashedPassword,
        bio,
        profilePicture,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    };


    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Blog, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      User.belongsToMany(models.Comment, { through: 'commentLikes' });
      User.belongsToMany(models.Blog, { through: 'blogLikes' });

    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      hashedpassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 256]
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500]
        }
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};

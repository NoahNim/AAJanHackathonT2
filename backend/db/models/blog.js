"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, { foreignKey: "ownerId" });
      Blog.hasMany(models.Comment, {
        foreignKey: "blogId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Blog.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 60],
        },
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: [5, 2000],
        },
        allowNull: false,
      },
      tags: {
        type: DataTypes.ENUM(
          "Personal",
          "Lifestyle",
          "Travel",
          "Fashion",
          "Food",
          "Parenting",
          "Fitness",
          "Technology",
          "Finance",
          "DIY",
          "Craft",
          "Book",
          "Movie",
          "TV Review",
          "Career",
          "Professional Development",
          "Environmental",
          "Sustainability",
          "Photography",
          "Political",
          "Social Commentary"
        ),
        allowNull: false,
      },
      pictures: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Blog",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Blog;
};

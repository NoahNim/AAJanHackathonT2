'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, { foreignKey: 'ownerId' })
      Blog.hasMany(models.Comment, { foreignKey: 'blogId', onDelete: 'CASCADE', hooks: true})

    }
  }
  Blog.init({
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,40]
            }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,1000]
            }
        },
        ownerId: {
            type: DataTypes.INTEGER
        }
  }, {
    sequelize,
    modelName: 'Blog',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Blog;
};
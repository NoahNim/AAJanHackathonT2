'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
      Comment.belongsTo(models.Blog, { foreignKey: 'blogId' })
    }
  }
  Comment.init({
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,1000]
            }
        },
        userId: {
            type: DataTypes.INTEGER
        },
        blogId: {
            type: DataTypes.INTEGER
        }
  }, {
    sequelize,
    modelName: 'Comment',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Comment;
};
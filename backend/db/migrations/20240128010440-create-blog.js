"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        allowNull: false,
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Blogs";
    await queryInterface.dropTable(options);
  },
};

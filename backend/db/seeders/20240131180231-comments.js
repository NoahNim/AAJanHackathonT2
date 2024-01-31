'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Comments';  // Change the table name to Comments
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,  // Assuming you have a user with ID 1
        blogId: 1,  // Assuming you have a blog with ID 1
        text: 'This is a great blog post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,  
        blogId: 1,  
        text: 'Really enjoyed reading this!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,  // Same user as first comment
        blogId: 2,  // Different blog, assuming you have a blog with ID 2
        text: 'I have some different thoughts.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';  // Change the table name to Comments
    await queryInterface.bulkDelete(options, null, {});
  }
};

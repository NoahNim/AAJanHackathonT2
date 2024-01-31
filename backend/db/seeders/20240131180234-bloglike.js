'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'blogLikes'; 
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,  
        blogId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,  
        blogId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        blogId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'blogLikes';  // Change the table name to Comments
    await queryInterface.bulkDelete(options, null, {});
  }
};

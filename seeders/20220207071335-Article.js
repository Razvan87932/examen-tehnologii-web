'use strict';
const faker = require("faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    for(let i = 0; i < 20; i++) {
      data.push({
        title: faker.lorem.words(3),
        summary: faker.lorem.words(6),
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Articles', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
